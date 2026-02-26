/* ============================================================
   Zenon's Learning World – Offline PWA with Upload Module
   ============================================================ */

// ──────────────── DATA ────────────────

const ANIMALS = [
  { id: 'cat',      name: 'Cat',      emoji: '🐱', sound: 'Meow!',         color: '#FF9800' },
  { id: 'dog',      name: 'Dog',      emoji: '🐶', sound: 'Woof woof!',    color: '#8D6E63' },
  { id: 'cow',      name: 'Cow',      emoji: '🐮', sound: 'Mooo!',         color: '#43A047' },
  { id: 'duck',     name: 'Duck',     emoji: '🦆', sound: 'Quack quack!',  color: '#1E88E5' },
  { id: 'pig',      name: 'Pig',      emoji: '🐷', sound: 'Oink oink!',    color: '#EC407A' },
  { id: 'chicken',  name: 'Chicken',  emoji: '🐔', sound: 'Cluck cluck!',  color: '#FF7043' },
  { id: 'frog',     name: 'Frog',     emoji: '🐸', sound: 'Ribbit!',       color: '#66BB6A' },
  { id: 'lion',     name: 'Lion',     emoji: '🦁', sound: 'Roar!',         color: '#FFA000' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', sound: 'Pawoo!',        color: '#78909C' },
  { id: 'horse',    name: 'Horse',    emoji: '🐴', sound: 'Neigh!',        color: '#6D4C41' },
  { id: 'sheep',    name: 'Sheep',    emoji: '🐑', sound: 'Baa baa!',      color: '#9E9E9E' },
  { id: 'bird',     name: 'Bird',     emoji: '🐦', sound: 'Tweet tweet!',  color: '#29B6F6' }
];

const FAMILY = [
  { id: 'mom',     name: 'Mommy',   emoji: '👩', sound: 'Mommy',   color: '#E91E63' },
  { id: 'dad',     name: 'Daddy',   emoji: '👨', sound: 'Daddy',   color: '#1976D2' },
  { id: 'baby',    name: 'Baby',    emoji: '👶', sound: 'Baby',    color: '#FF9800' },
  { id: 'brother', name: 'Brother', emoji: '👦', sound: 'Brother', color: '#43A047' },
  { id: 'sister',  name: 'Sister',  emoji: '👧', sound: 'Sister',  color: '#AB47BC' },
  { id: 'grandma', name: 'Grandma', emoji: '👵', sound: 'Grandma', color: '#FF7043' },
  { id: 'grandpa', name: 'Grandpa', emoji: '👴', sound: 'Grandpa', color: '#546E7A' },
  { id: 'pet',     name: 'Pet',     emoji: '🐕', sound: 'Pet',     color: '#8D6E63' }
];

const COLOR_PALETTE = [
  '#FF9800','#E91E63','#1976D2','#43A047','#AB47BC',
  '#FF7043','#66BB6A','#FFA000','#78909C','#8D6E63',
  '#29B6F6','#EC407A','#546E7A','#6D4C41','#9E9E9E'
];

// ──────────────── INDEXED DB ────────────────

const mediaDB = {
  _db: null,
  DB_NAME: 'zenon-media',
  DB_VERSION: 1,

  open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('images')) db.createObjectStore('images');
        if (!db.objectStoreNames.contains('sounds')) db.createObjectStore('sounds');
        if (!db.objectStoreNames.contains('custom-items')) db.createObjectStore('custom-items');
      };
      req.onsuccess = (e) => { this._db = e.target.result; resolve(this._db); };
      req.onerror = () => reject(req.error);
    });
  },

  _tx(store, mode) {
    return this._db.transaction(store, mode).objectStore(store);
  },

  _put(store, key, value) {
    return new Promise((resolve, reject) => {
      const req = this._tx(store, 'readwrite').put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  _get(store, key) {
    return new Promise((resolve, reject) => {
      const req = this._tx(store, 'readonly').get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  },

  _delete(store, key) {
    return new Promise((resolve, reject) => {
      const req = this._tx(store, 'readwrite').delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  _getAll(store) {
    return new Promise((resolve, reject) => {
      const s = this._tx(store, 'readonly');
      const req = s.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  key(mod, id) { return `${mod}/${id}`; },

  saveImage(mod, id, blob)  { return this._put('images', this.key(mod, id), blob); },
  getImage(mod, id)         { return this._get('images', this.key(mod, id)); },
  deleteImage(mod, id)      { return this._delete('images', this.key(mod, id)); },

  saveSound(mod, id, blob)  { return this._put('sounds', this.key(mod, id), blob); },
  getSound(mod, id)         { return this._get('sounds', this.key(mod, id)); },
  deleteSound(mod, id)      { return this._delete('sounds', this.key(mod, id)); },

  saveCustomItem(item) {
    return this._put('custom-items', this.key(item.module, item.id), item);
  },
  getCustomItems() {
    return this._getAll('custom-items');
  },
  deleteCustomItem(mod, id) {
    return this._delete('custom-items', this.key(mod, id));
  }
};

// ──────────────── MEDIA RESOLVER ────────────────

const media = {
  _urlCache: {},

  revokeAll() {
    Object.values(this._urlCache).forEach(url => URL.revokeObjectURL(url));
    this._urlCache = {};
  },

  async getImageURL(mod, id) {
    const cacheKey = `img-${mod}/${id}`;
    if (this._urlCache[cacheKey]) return this._urlCache[cacheKey];

    // 1. IndexedDB
    const blob = await mediaDB.getImage(mod, id);
    if (blob) {
      const url = URL.createObjectURL(blob);
      this._urlCache[cacheKey] = url;
      return url;
    }

    // 2. File folder – try common extensions
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'];
    for (const ext of exts) {
      const path = `assets/images/${mod}/${id}.${ext}`;
      try {
        const resp = await fetch(path, { method: 'HEAD' });
        if (resp.ok) {
          this._urlCache[cacheKey] = path;
          return path;
        }
      } catch (e) { /* ignore */ }
    }

    // 3. No image found
    return null;
  },

  async getSoundBlob(mod, id) {
    // 1. IndexedDB
    const blob = await mediaDB.getSound(mod, id);
    if (blob) return blob;

    // 2. File folder
    const exts = ['mp3', 'wav', 'ogg', 'webm', 'm4a'];
    for (const ext of exts) {
      const path = `assets/sounds/${mod}/${id}.${ext}`;
      try {
        const resp = await fetch(path);
        if (resp.ok) return await resp.blob();
      } catch (e) { /* ignore */ }
    }

    return null;
  },

  async hasImage(mod, id) {
    const blob = await mediaDB.getImage(mod, id);
    if (blob) return true;
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'];
    for (const ext of exts) {
      try {
        const resp = await fetch(`assets/images/${mod}/${id}.${ext}`, { method: 'HEAD' });
        if (resp.ok) return true;
      } catch (e) { /* ignore */ }
    }
    return false;
  },

  async hasSound(mod, id) {
    const blob = await mediaDB.getSound(mod, id);
    if (blob) return true;
    const exts = ['mp3', 'wav', 'ogg', 'webm', 'm4a'];
    for (const ext of exts) {
      try {
        const resp = await fetch(`assets/sounds/${mod}/${id}.${ext}`, { method: 'HEAD' });
        if (resp.ok) return true;
      } catch (e) { /* ignore */ }
    }
    return false;
  }
};

// ──────────────── STATE ────────────────

const state = {
  screen: 'home',
  module: null,
  quizItems: [],
  quizIndex: 0,
  quizScore: 0,
  quizOptions: [],
  quizCorrect: null,
  quizLocked: false,
  // Settings
  settingsTab: 'animals',
  editingItem: null,
  addingItem: false,
  // Media cache for current render
  imageURLs: {},
  customItems: []
};

// ──────────────── SOUND MANAGER ────────────────

const sound = {
  synth: window.speechSynthesis,
  _ctx: null,
  _currentAudio: null,

  ctx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  speak(text, opts = {}) {
    return new Promise(resolve => {
      if (!this.synth) { resolve(); return; }
      this.synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.pitch  = opts.pitch  ?? 1;
      u.rate   = opts.rate   ?? 0.9;
      u.volume = opts.volume ?? 1;
      u.lang   = opts.lang   ?? 'en-US';
      u.onend   = resolve;
      u.onerror = resolve;
      this.synth.speak(u);
      setTimeout(resolve, 3000);
    });
  },

  tone(freq, dur, type = 'sine') {
    const c = this.ctx();
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.25;
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    osc.stop(c.currentTime + dur);
  },

  correct() {
    [523.25, 659.25, 783.99].forEach((f, i) =>
      setTimeout(() => this.tone(f, 0.18), i * 90)
    );
  },

  wrong() {
    this.tone(300, 0.1, 'sawtooth');
    setTimeout(() => this.tone(200, 0.25, 'sawtooth'), 120);
  },

  stopAudio() {
    if (this._currentAudio) {
      this._currentAudio.pause();
      this._currentAudio.currentTime = 0;
      this._currentAudio = null;
    }
    if (this.synth) this.synth.cancel();
  },

  playBlob(blob) {
    return new Promise((resolve) => {
      this.stopAudio();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      this._currentAudio = audio;
      audio.onended = () => { URL.revokeObjectURL(url); this._currentAudio = null; resolve(); };
      audio.onerror = () => { URL.revokeObjectURL(url); this._currentAudio = null; resolve(); };
      audio.play().catch(() => resolve());
    });
  },

  async playItem(item, moduleType) {
    const soundBlob = await media.getSoundBlob(moduleType, item.id);
    if (soundBlob) {
      await this.playBlob(soundBlob);
    } else if (moduleType === 'animals') {
      await this.speak(item.sound, { pitch: 1.1, rate: 1 });
      await delay(300);
      await this.speak(item.name, { rate: 0.85 });
    } else {
      await this.speak(item.sound, { rate: 0.85 });
    }
  },

  async playQuizClue(item, moduleType) {
    const soundBlob = await media.getSoundBlob(moduleType, item.id);
    if (soundBlob) {
      this.playBlob(soundBlob);
    } else if (moduleType === 'animals') {
      this.speak(item.sound, { pitch: 1.1, rate: 1 });
    } else {
      this.speak(item.sound, { rate: 0.85 });
    }
  }
};

// ──────────────── HELPERS ────────────────

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getItems() {
  const base = state.module === 'animals' ? ANIMALS : FAMILY;
  const custom = state.customItems.filter(i => i.module === state.module);
  return [...base, ...custom];
}

function getModuleLabel() {
  return state.module === 'animals' ? '🐾 Animals' : '👨‍👩‍👧‍👦 Family';
}

function gridCols(count) {
  const landscape = window.innerWidth > window.innerHeight;
  if (count <= 4)  return 2;
  if (count <= 6)  return landscape ? 3 : 2;
  if (count <= 9)  return 3;
  return landscape ? 4 : 3;
}

function sanitizeId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function itemExists(mod, id) {
  const builtIn = mod === 'animals' ? ANIMALS : FAMILY;
  if (builtIn.some(i => i.id === id)) return true;
  return state.customItems.some(i => i.module === mod && i.id === id);
}

// ──────────────── PRELOAD MEDIA ────────────────

async function preloadImages() {
  const mods = ['animals', 'family'];
  state.imageURLs = {};
  for (const mod of mods) {
    const base = mod === 'animals' ? ANIMALS : FAMILY;
    const custom = state.customItems.filter(i => i.module === mod);
    const all = [...base, ...custom];
    for (const item of all) {
      const url = await media.getImageURL(mod, item.id);
      if (url) state.imageURLs[`${mod}/${item.id}`] = url;
    }
  }
}

// ──────────────── NAVIGATION ────────────────

function go(screen, data) {
  Object.assign(state, data || {});
  state.screen = screen;
  const app = document.getElementById('app');
  app.classList.add('fading');
  setTimeout(() => {
    render();
    app.classList.remove('fading');
  }, 200);
}

// ──────────────── RENDERERS ────────────────

function render() {
  const app = document.getElementById('app');
  switch (state.screen) {
    case 'home':     app.innerHTML = renderHome();     break;
    case 'menu':     app.innerHTML = renderMenu();     break;
    case 'explore':  app.innerHTML = renderExplore();  break;
    case 'quiz':     app.innerHTML = renderQuiz();     break;
    case 'results':  app.innerHTML = renderResults();  break;
    case 'settings': app.innerHTML = renderSettings(); break;
    case 'editItem': app.innerHTML = renderItemEditor(); break;
    case 'addItem':  app.innerHTML = renderAddItem();  break;
  }
  bind();
}

function renderCardVisual(item, mod) {
  const key = `${mod}/${item.id}`;
  const imgURL = state.imageURLs[key];
  if (imgURL) {
    return `<img class="card-image" src="${imgURL}" alt="${item.name}" draggable="false">`;
  }
  return `<div class="card-emoji">${item.emoji || '🆕'}</div>`;
}

function renderHome() {
  return `
    <div class="content">
      <div class="home-title">ZENON</div>
      <div class="home-subtitle">Learning World</div>
      <div class="card-row">
        <div class="menu-card" data-go="menu" data-module="family">
          <div class="menu-card-emoji">👨‍👩‍👧‍👦</div>
          <div class="menu-card-label">Family</div>
        </div>
        <div class="menu-card" data-go="menu" data-module="animals">
          <div class="menu-card-emoji">🦁</div>
          <div class="menu-card-label">Animals</div>
        </div>
      </div>
      <button class="settings-btn" data-go="settings">⚙️ Manage</button>
    </div>`;
}

function renderMenu() {
  return `
    <div class="header">
      <button class="back-btn" data-go="home">◀</button>
      <div class="header-title">${getModuleLabel()}</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="card-row">
        <div class="menu-card" data-go="explore">
          <div class="menu-card-emoji">👆</div>
          <div class="menu-card-label">Explore</div>
          <div class="menu-card-desc">Tap to hear sounds</div>
        </div>
        <div class="menu-card" data-go="quiz" data-action="startQuiz">
          <div class="menu-card-emoji">🎯</div>
          <div class="menu-card-label">Quiz</div>
          <div class="menu-card-desc">Listen &amp; guess!</div>
        </div>
      </div>
    </div>`;
}

function renderExplore() {
  const items = getItems();
  const cols = gridCols(items.length);
  const cards = items.map(it => `
    <div class="explore-card" data-id="${it.id}"
         style="background:linear-gradient(135deg,${it.color}dd,${it.color}99)">
      ${renderCardVisual(it, state.module)}
      <div class="explore-card-label">${it.name}</div>
    </div>`).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="menu">◀</button>
      <div class="header-title">${getModuleLabel()} – Explore</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="explore-grid cols-${cols}">${cards}</div>
    </div>`;
}

function renderQuiz() {
  const q   = state.quizItems[state.quizIndex];
  const num = `${state.quizIndex + 1} / ${state.quizItems.length}`;
  const opts = state.quizOptions.map(it => `
    <div class="quiz-card" data-id="${it.id}"
         style="background:linear-gradient(135deg,${it.color}dd,${it.color}99)">
      ${renderCardVisual(it, state.module)}
      <div class="quiz-card-label">${it.name}</div>
    </div>`).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="menu">◀</button>
      <div class="header-title">${getModuleLabel()} – Quiz</div>
      <div class="header-right">⭐ ${num}</div>
    </div>
    <div class="content">
      <div class="quiz-wrap">
        <div class="quiz-prompt">Who makes this sound?</div>
        <button class="play-btn" id="playBtn">🔊</button>
        <div class="quiz-options">${opts}</div>
      </div>
    </div>`;
}

function renderResults() {
  const { quizScore: sc, quizItems } = state;
  const total = quizItems.length;
  const pct   = sc / total;
  let stars, msg;
  if (pct >= 1)        { stars = '⭐⭐⭐'; msg = 'Perfect!'; }
  else if (pct >= 0.7) { stars = '⭐⭐';   msg = 'Great job!'; }
  else if (pct >= 0.4) { stars = '⭐';      msg = 'Good try!'; }
  else                 { stars = '🌟';      msg = 'Keep practicing!'; }

  return `
    <div class="header">
      <button class="back-btn" data-go="menu">◀</button>
      <div class="header-title">${getModuleLabel()} – Results</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="results">
        <div class="results-stars">${stars}</div>
        <div class="results-score">${sc} / ${total}</div>
        <div class="results-msg">${msg}</div>
        <div class="btn-row">
          <button class="big-btn" data-go="menu">Home</button>
          <button class="big-btn" data-action="startQuiz" data-go="quiz">Play Again</button>
        </div>
      </div>
    </div>`;
}

// ──────────────── SETTINGS SCREEN ────────────────

function renderSettings() {
  const tab = state.settingsTab;
  const base = tab === 'animals' ? ANIMALS : FAMILY;
  const custom = state.customItems.filter(i => i.module === tab);
  const all = [...base, ...custom];

  const items = all.map(it => {
    const key = `${tab}/${it.id}`;
    const hasImg = !!state.imageURLs[key];
    const isCustom = custom.some(c => c.id === it.id);
    return `
      <div class="settings-item" data-edit-id="${it.id}" data-edit-mod="${tab}">
        <div class="settings-item-visual" style="background:linear-gradient(135deg,${it.color}dd,${it.color}99)">
          ${hasImg
            ? `<img class="settings-item-img" src="${state.imageURLs[key]}" alt="${it.name}" draggable="false">`
            : `<span class="settings-item-emoji">${it.emoji || '🆕'}</span>`}
        </div>
        <div class="settings-item-info">
          <div class="settings-item-name">${it.name}${isCustom ? ' <span class="custom-badge">custom</span>' : ''}</div>
          <div class="settings-item-status">
            ${hasImg ? '🖼️' : '⬜'} Image
            <span class="status-dot" id="sound-status-${it.id}">⏳</span> Sound
          </div>
        </div>
        <div class="settings-item-arrow">▶</div>
      </div>`;
  }).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="home">◀</button>
      <div class="header-title">⚙️ Manage Media</div>
      <div class="header-right"></div>
    </div>
    <div class="settings-tabs">
      <button class="settings-tab ${tab === 'animals' ? 'active' : ''}" data-tab="animals">🐾 Animals</button>
      <button class="settings-tab ${tab === 'family' ? 'active' : ''}" data-tab="family">👨‍👩‍👧‍👦 Family</button>
    </div>
    <div class="settings-list">
      ${items}
      <button class="add-item-btn" data-go="addItem" data-add-module="${tab}">+ Add New ${tab === 'animals' ? 'Animal' : 'Family Member'}</button>
    </div>`;
}

// ──────────────── ITEM EDITOR ────────────────

function renderItemEditor() {
  const item = state.editingItem;
  if (!item) return '';
  const mod = item._module;
  const key = `${mod}/${item.id}`;
  const hasImg = !!state.imageURLs[key];
  const isCustom = state.customItems.some(c => c.module === mod && c.id === item.id);

  return `
    <div class="header">
      <button class="back-btn" data-go="settings">◀</button>
      <div class="header-title">Edit: ${item.name}</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="editor-wrap">
        <div class="editor-preview" style="background:linear-gradient(135deg,${item.color}dd,${item.color}99)">
          ${hasImg
            ? `<img class="editor-preview-img" src="${state.imageURLs[key]}" alt="${item.name}" draggable="false">`
            : `<div class="editor-preview-emoji">${item.emoji || '🆕'}</div>`}
          <div class="editor-preview-label">${item.name}</div>
        </div>

        <div class="editor-section">
          <div class="editor-section-title">🖼️ Image</div>
          <div class="editor-btns">
            <label class="upload-btn">
              📷 Upload Image
              <input type="file" accept="image/*" capture="environment" id="imageInput" hidden>
            </label>
            ${hasImg ? '<button class="delete-btn" id="deleteImage">🗑️ Remove</button>' : ''}
          </div>
        </div>

        <div class="editor-section">
          <div class="editor-section-title">🔊 Sound</div>
          <div class="editor-btns">
            <label class="upload-btn">
              🎤 Upload Sound
              <input type="file" accept="audio/*" capture="microphone" id="soundInput" hidden>
            </label>
            <button class="upload-btn" id="previewSound">▶ Preview</button>
            <button class="delete-btn" id="deleteSound" style="display:none">🗑️ Remove</button>
          </div>
        </div>

        ${isCustom ? `
        <div class="editor-section">
          <div class="editor-section-title">⚠️ Danger Zone</div>
          <button class="delete-btn danger" id="deleteItem">🗑️ Delete This Item</button>
        </div>` : ''}
      </div>
    </div>`;
}

// ──────────────── ADD ITEM SCREEN ────────────────

function renderAddItem() {
  const mod = state.settingsTab;
  const colorBtns = COLOR_PALETTE.map(c =>
    `<button class="color-btn" data-color="${c}" style="background:${c}"></button>`
  ).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="settings">◀</button>
      <div class="header-title">Add New ${mod === 'animals' ? 'Animal' : 'Family Member'}</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="add-form">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input type="text" id="newItemName" class="form-input" placeholder="e.g. Tiger" autocomplete="off" maxlength="20">
        </div>

        <div class="form-group">
          <label class="form-label">Sound Text (for speech fallback)</label>
          <input type="text" id="newItemSound" class="form-input" placeholder="e.g. Rawr!" autocomplete="off" maxlength="30">
        </div>

        <div class="form-group">
          <label class="form-label">Color</label>
          <div class="color-picker">${colorBtns}</div>
          <input type="hidden" id="newItemColor" value="${COLOR_PALETTE[0]}">
        </div>

        <div class="form-group">
          <label class="form-label">Image (optional)</label>
          <label class="upload-btn">
            📷 Choose Image
            <input type="file" accept="image/*" capture="environment" id="newItemImage" hidden>
          </label>
          <div id="newItemImagePreview" class="form-preview"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Sound (optional)</label>
          <label class="upload-btn">
            🎤 Choose Sound
            <input type="file" accept="audio/*" capture="microphone" id="newItemSoundFile" hidden>
          </label>
          <div id="newItemSoundPreview" class="form-preview"></div>
        </div>

        <button class="big-btn save-btn" id="saveNewItem">Save</button>
      </div>
    </div>`;
}

// ──────────────── QUIZ LOGIC ────────────────

function startQuiz() {
  const items = getItems();
  state.quizItems  = shuffle(items);
  state.quizIndex  = 0;
  state.quizScore  = 0;
  state.quizLocked = false;
  prepareQuestion();
}

function prepareQuestion() {
  const items   = getItems();
  const correct = state.quizItems[state.quizIndex];
  const others  = shuffle(items.filter(i => i.id !== correct.id)).slice(0, 3);
  state.quizOptions = shuffle([correct, ...others]);
  state.quizCorrect = correct;
  state.quizLocked  = false;
}

function handleQuizAnswer(id) {
  if (state.quizLocked) return;
  state.quizLocked = true;

  const correct = state.quizCorrect;
  const isRight = id === correct.id;

  if (isRight) state.quizScore++;

  document.querySelectorAll('.quiz-card').forEach(el => {
    el.classList.add('disabled');
    if (el.dataset.id === id) {
      el.classList.add(isRight ? 'correct' : 'wrong');
    }
    if (el.dataset.id === correct.id && !isRight) {
      el.classList.add('reveal');
    }
  });

  if (isRight) {
    sound.correct();
    spawnConfetti();
  } else {
    sound.wrong();
  }

  setTimeout(() => {
    state.quizIndex++;
    if (state.quizIndex < state.quizItems.length) {
      prepareQuestion();
      go('quiz');
      setTimeout(() => sound.playQuizClue(state.quizCorrect, state.module), 400);
    } else {
      go('results');
      if (state.quizScore / state.quizItems.length >= 0.7) spawnConfetti();
    }
  }, isRight ? 1200 : 1800);
}

// ──────────────── CONFETTI ────────────────

function spawnConfetti() {
  const layer = document.getElementById('confetti-layer');
  const colors = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF6FC8','#845EC2'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + '%';
    el.style.top  = '-5%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width  = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    el.style.setProperty('--dur',   (1 + Math.random() * 1) + 's');
    el.style.setProperty('--delay', (Math.random() * 0.3) + 's');
    el.style.setProperty('--rot',   (360 + Math.random() * 720) + 'deg');
    frag.appendChild(el);
  }
  layer.appendChild(frag);
  setTimeout(() => { layer.innerHTML = ''; }, 2500);
}

// ──────────────── EVENT BINDING ────────────────

function bind() {
  // Navigation buttons
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.go;
      const mod    = el.dataset.module;
      const action = el.dataset.action;
      const addMod = el.dataset.addModule;

      if (mod) state.module = mod;
      if (action === 'startQuiz') startQuiz();
      if (addMod) state.settingsTab = addMod;

      go(target);

      if (target === 'quiz') {
        setTimeout(() => sound.playQuizClue(state.quizCorrect, state.module), 500);
      }

      requestFullscreen();
    });
  });

  // Explore cards
  document.querySelectorAll('.explore-card').forEach(el => {
    el.addEventListener('click', () => {
      const id   = el.dataset.id;
      const items = getItems();
      const item  = items.find(i => i.id === id);
      if (!item) return;

      el.classList.remove('playing');
      void el.offsetWidth;
      el.classList.add('playing');

      sound.playItem(item, state.module);
    });
  });

  // Quiz option cards
  document.querySelectorAll('.quiz-card').forEach(el => {
    el.addEventListener('click', () => handleQuizAnswer(el.dataset.id));
  });

  // Replay quiz sound button
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      sound.playQuizClue(state.quizCorrect, state.module);
    });
  }

  // Settings tab buttons
  document.querySelectorAll('.settings-tab').forEach(el => {
    el.addEventListener('click', () => {
      state.settingsTab = el.dataset.tab;
      go('settings');
    });
  });

  // Settings item edit buttons
  document.querySelectorAll('.settings-item').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.editId;
      const mod = el.dataset.editMod;
      const base = mod === 'animals' ? ANIMALS : FAMILY;
      const custom = state.customItems.filter(i => i.module === mod);
      const all = [...base, ...custom];
      const item = all.find(i => i.id === id);
      if (item) {
        state.editingItem = { ...item, _module: mod };
        go('editItem');
      }
    });
  });

  // Async: check sound status indicators
  if (state.screen === 'settings') {
    checkSoundStatuses();
  }

  // Item editor bindings
  bindEditor();

  // Add item bindings
  bindAddItem();
}

async function checkSoundStatuses() {
  const tab = state.settingsTab;
  const base = tab === 'animals' ? ANIMALS : FAMILY;
  const custom = state.customItems.filter(i => i.module === tab);
  const all = [...base, ...custom];
  for (const it of all) {
    const has = await media.hasSound(tab, it.id);
    const el = document.getElementById(`sound-status-${it.id}`);
    if (el) el.textContent = has ? '🔊' : '⬜';
  }
}

function bindEditor() {
  const imageInput = document.getElementById('imageInput');
  const soundInput = document.getElementById('soundInput');
  const deleteImageBtn = document.getElementById('deleteImage');
  const deleteSoundBtn = document.getElementById('deleteSound');
  const previewSoundBtn = document.getElementById('previewSound');
  const deleteItemBtn = document.getElementById('deleteItem');

  if (!imageInput) return;
  const item = state.editingItem;
  const mod = item._module;

  // Check if sound exists and show delete button
  media.hasSound(mod, item.id).then(has => {
    if (has && deleteSoundBtn) deleteSoundBtn.style.display = '';
  });

  imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await mediaDB.saveImage(mod, item.id, file);
    await preloadImages();
    go('editItem');
  });

  soundInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await mediaDB.saveSound(mod, item.id, file);
    go('editItem');
  });

  if (deleteImageBtn) {
    deleteImageBtn.addEventListener('click', async () => {
      await mediaDB.deleteImage(mod, item.id);
      delete state.imageURLs[`${mod}/${item.id}`];
      media._urlCache = {};
      await preloadImages();
      go('editItem');
    });
  }

  if (deleteSoundBtn) {
    deleteSoundBtn.addEventListener('click', async () => {
      await mediaDB.deleteSound(mod, item.id);
      go('editItem');
    });
  }

  if (previewSoundBtn) {
    previewSoundBtn.addEventListener('click', () => {
      sound.playItem(item, mod);
    });
  }

  if (deleteItemBtn) {
    deleteItemBtn.addEventListener('click', async () => {
      await mediaDB.deleteCustomItem(mod, item.id);
      await mediaDB.deleteImage(mod, item.id);
      await mediaDB.deleteSound(mod, item.id);
      state.customItems = state.customItems.filter(i => !(i.module === mod && i.id === item.id));
      delete state.imageURLs[`${mod}/${item.id}`];
      state.editingItem = null;
      go('settings');
    });
  }
}

function bindAddItem() {
  const saveBtn = document.getElementById('saveNewItem');
  if (!saveBtn) return;

  const mod = state.settingsTab;
  let selectedColor = COLOR_PALETTE[0];
  let imageFile = null;
  let soundFile = null;

  // Color picker
  document.querySelectorAll('.color-btn').forEach(btn => {
    // Highlight default
    if (btn.dataset.color === selectedColor) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedColor = btn.dataset.color;
    });
  });

  // Image file
  const imgInput = document.getElementById('newItemImage');
  if (imgInput) {
    imgInput.addEventListener('change', (e) => {
      imageFile = e.target.files[0];
      const preview = document.getElementById('newItemImagePreview');
      if (imageFile && preview) {
        preview.textContent = `✓ ${imageFile.name}`;
      }
    });
  }

  // Sound file
  const sndInput = document.getElementById('newItemSoundFile');
  if (sndInput) {
    sndInput.addEventListener('change', (e) => {
      soundFile = e.target.files[0];
      const preview = document.getElementById('newItemSoundPreview');
      if (soundFile && preview) {
        preview.textContent = `✓ ${soundFile.name}`;
      }
    });
  }

  // Save
  saveBtn.addEventListener('click', async () => {
    const nameEl = document.getElementById('newItemName');
    const soundTextEl = document.getElementById('newItemSound');
    const name = (nameEl.value || '').trim();
    const soundText = (soundTextEl.value || '').trim() || name;

    if (!name) {
      nameEl.classList.add('error');
      nameEl.focus();
      return;
    }

    const id = sanitizeId(name);
    if (!id) {
      nameEl.classList.add('error');
      return;
    }

    if (itemExists(mod, id)) {
      nameEl.classList.add('error');
      nameEl.placeholder = 'Name already exists!';
      nameEl.value = '';
      return;
    }

    const newItem = {
      id,
      name,
      emoji: '',
      sound: soundText,
      color: selectedColor,
      module: mod
    };

    await mediaDB.saveCustomItem(newItem);
    state.customItems.push(newItem);

    if (imageFile) await mediaDB.saveImage(mod, id, imageFile);
    if (soundFile) await mediaDB.saveSound(mod, id, soundFile);

    await preloadImages();
    go('settings');
  });
}

// ──────────────── FULLSCREEN & LOCK ────────────────

function requestFullscreen() {
  const el = document.documentElement;
  const rq = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (rq) rq.call(el).catch(() => {});
}

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try { await navigator.wakeLock.request('screen'); } catch (e) {}
  }
}

// ──────────────── PREVENT SCROLL / ZOOM ────────────────

function lockViewport() {
  document.addEventListener('gesturestart', e => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', e => e.preventDefault(), { passive: false });

  document.addEventListener('touchmove', e => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });

  let lastTap = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTap < 300) e.preventDefault();
    lastTap = now;
  }, { passive: false });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
      e.preventDefault();
    }
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
}

// ──────────────── SERVICE WORKER ────────────────

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

// ──────────────── INIT ────────────────

async function init() {
  registerSW();
  lockViewport();
  requestWakeLock();

  await mediaDB.open();
  state.customItems = await mediaDB.getCustomItems();
  await preloadImages();

  render();
}

document.addEventListener('DOMContentLoaded', init);
