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

// ──────────────── ABC DATA ────────────────

const ABC_LETTERS = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'
];

const ABC_WORDS = [
  { id: 'arbol',      name: 'Árbol',      letter: 'a', color: '#43A047' },
  { id: 'abeja',      name: 'Abeja',      letter: 'a', color: '#FFA000' },
  { id: 'barco',      name: 'Barco',      letter: 'b', color: '#1E88E5' },
  { id: 'ballena',    name: 'Ballena',    letter: 'b', color: '#546E7A' },
  { id: 'casa',       name: 'Casa',       letter: 'c', color: '#FF7043' },
  { id: 'caballo',    name: 'Caballo',    letter: 'c', color: '#8D6E63' },
  { id: 'dinosaurio', name: 'Dinosaurio', letter: 'd', color: '#66BB6A' },
  { id: 'delfin',     name: 'Delfín',     letter: 'd', color: '#29B6F6' },
  { id: 'estrella',   name: 'Estrella',   letter: 'e', color: '#FFD93D' },
  { id: 'elefante',   name: 'Elefante',   letter: 'e', color: '#78909C' },
  { id: 'flor',       name: 'Flor',       letter: 'f', color: '#EC407A' },
  { id: 'fresa',      name: 'Fresa',      letter: 'f', color: '#E53935' },
  { id: 'gato',       name: 'Gato',       letter: 'g', color: '#FF9800' },
  { id: 'globo',      name: 'Globo',      letter: 'g', color: '#AB47BC' },
  { id: 'helado',     name: 'Helado',     letter: 'h', color: '#F48FB1' },
  { id: 'hormiga',    name: 'Hormiga',    letter: 'h', color: '#6D4C41' },
  { id: 'iglesia',    name: 'Iglesia',    letter: 'i', color: '#9E9E9E' },
  { id: 'iguana',     name: 'Iguana',     letter: 'i', color: '#43A047' },
  { id: 'jirafa',     name: 'Jirafa',     letter: 'j', color: '#FFA000' },
  { id: 'jardin',     name: 'Jardín',     letter: 'j', color: '#66BB6A' },
  { id: 'koala',      name: 'Koala',      letter: 'k', color: '#78909C' },
  { id: 'kiwi',       name: 'Kiwi',       letter: 'k', color: '#8D6E63' },
  { id: 'leon',       name: 'León',       letter: 'l', color: '#FFA000' },
  { id: 'luna',       name: 'Luna',       letter: 'l', color: '#1976D2' },
  { id: 'mariposa',   name: 'Mariposa',   letter: 'm', color: '#AB47BC' },
  { id: 'manzana',    name: 'Manzana',    letter: 'm', color: '#E53935' },
  { id: 'naranja',    name: 'Naranja',    letter: 'n', color: '#FF9800' },
  { id: 'nube',       name: 'Nube',       letter: 'n', color: '#90CAF9' },
  { id: 'nandu',      name: 'Ñandú',      letter: 'ñ', color: '#8D6E63' },
  { id: 'oso',        name: 'Oso',        letter: 'o', color: '#6D4C41' },
  { id: 'oveja',      name: 'Oveja',      letter: 'o', color: '#9E9E9E' },
  { id: 'perro',      name: 'Perro',      letter: 'p', color: '#8D6E63' },
  { id: 'pelota',     name: 'Pelota',     letter: 'p', color: '#E53935' },
  { id: 'queso',      name: 'Queso',      letter: 'q', color: '#FFC107' },
  { id: 'raton',      name: 'Ratón',      letter: 'r', color: '#78909C' },
  { id: 'rosa',       name: 'Rosa',       letter: 'r', color: '#EC407A' },
  { id: 'sol',        name: 'Sol',        letter: 's', color: '#FFD93D' },
  { id: 'serpiente',  name: 'Serpiente',   letter: 's', color: '#43A047' },
  { id: 'tortuga',    name: 'Tortuga',    letter: 't', color: '#66BB6A' },
  { id: 'tren',       name: 'Tren',       letter: 't', color: '#1E88E5' },
  { id: 'uva',        name: 'Uva',        letter: 'u', color: '#7B1FA2' },
  { id: 'unicornio',  name: 'Unicornio',  letter: 'u', color: '#AB47BC' },
  { id: 'vaca',       name: 'Vaca',       letter: 'v', color: '#9E9E9E' },
  { id: 'volcan',     name: 'Volcán',     letter: 'v', color: '#FF7043' },
  { id: 'waffle',     name: 'Waffle',     letter: 'w', color: '#FFA000' },
  { id: 'xilofono',   name: 'Xilófono',   letter: 'x', color: '#EC407A' },
  { id: 'yoyo',       name: 'Yoyo',       letter: 'y', color: '#1E88E5' },
  { id: 'zapato',     name: 'Zapato',     letter: 'z', color: '#6D4C41' },
  { id: 'zanahoria',  name: 'Zanahoria',  letter: 'z', color: '#FF7043' }
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
  DB_VERSION: 2,

  open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('images')) db.createObjectStore('images');
        if (!db.objectStoreNames.contains('sounds')) db.createObjectStore('sounds');
        if (!db.objectStoreNames.contains('custom-items')) db.createObjectStore('custom-items');
        if (!db.objectStoreNames.contains('abc-words')) db.createObjectStore('abc-words');
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
  },

  saveAbcWord(word) {
    return this._put('abc-words', `${word.letter}/${word.id}`, word);
  },
  getAbcWords() {
    return this._getAll('abc-words');
  },
  deleteAbcWord(letter, id) {
    return this._delete('abc-words', `${letter}/${id}`);
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

    // 2. File folder – check all extensions in parallel
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'];
    const results = await Promise.all(exts.map(ext => {
      const path = `assets/images/${mod}/${id}.${ext}`;
      return fetch(path, { method: 'HEAD' })
        .then(r => r.ok ? path : null)
        .catch(() => null);
    }));
    const found = results.find(Boolean);
    if (found) { this._urlCache[cacheKey] = found; return found; }

    // 3. No image found
    return null;
  },

  async getSoundBlob(mod, id) {
    // 1. IndexedDB
    const blob = await mediaDB.getSound(mod, id);
    if (blob) return blob;

    // 2. File folder – check all extensions in parallel
    const exts = ['mp3', 'wav', 'ogg', 'webm', 'm4a'];
    const results = await Promise.all(exts.map(ext => {
      const path = `assets/sounds/${mod}/${id}.${ext}`;
      return fetch(path)
        .then(r => r.ok ? r.blob() : null)
        .catch(() => null);
    }));
    return results.find(Boolean) || null;
  },

  async hasImage(mod, id) {
    const blob = await mediaDB.getImage(mod, id);
    if (blob) return true;
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'];
    const results = await Promise.all(exts.map(ext =>
      fetch(`assets/images/${mod}/${id}.${ext}`, { method: 'HEAD' })
        .then(r => r.ok).catch(() => false)
    ));
    return results.some(Boolean);
  },

  async hasSound(mod, id) {
    const blob = await mediaDB.getSound(mod, id);
    if (blob) return true;
    const exts = ['mp3', 'wav', 'ogg', 'webm', 'm4a'];
    const results = await Promise.all(exts.map(ext =>
      fetch(`assets/sounds/${mod}/${id}.${ext}`, { method: 'HEAD' })
        .then(r => r.ok).catch(() => false)
    ));
    return results.some(Boolean);
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
  customItems: [],
  // ABC module
  abcLetterIndex: 0,
  abcCustomWords: []
};

// ──────────────── SOUND MANAGER ────────────────

const sound = {
  synth: window.speechSynthesis,
  _ctx: null,
  _currentAudio: null,
  _unlocked: false,
  _silentAudio: null,

  // iOS audio unlock – must run inside a user gesture (touchend / click)
  unlock() {
    if (this._unlocked) return;
    this._unlocked = true;

    // 1. Create & resume AudioContext
    const ctx = this.ctx();

    // 2. Play a tiny silent buffer through Web Audio to unlock it
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);

    // 3. Unlock HTML5 Audio element for iOS
    if (!this._silentAudio) {
      this._silentAudio = new Audio();
      this._silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYlmKSnAAAAAAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYlmKSnAAAAAAAAAAAAAAAAAAAA';
      this._silentAudio.load();
    }
    this._silentAudio.play().catch(() => {});

    // 4. Kick speechSynthesis on iOS – use space (not empty string)
    if (this.synth) {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0.01;
      u.lang = 'en-US';
      this.synth.speak(u);
    }

    // 5. Preload voices (iOS loads them asynchronously)
    if (this.synth && this.synth.getVoices) {
      this.synth.getVoices();
      if (typeof this.synth.addEventListener === 'function') {
        this.synth.addEventListener('voiceschanged', () => this.synth.getVoices());
      }
    }
  },

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
      let resolved = false;
      const done = () => { if (!resolved) { resolved = true; resolve(); } };

      // iOS needs a brief delay after cancel() before speak()
      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(text);
        u.pitch  = opts.pitch  ?? 1;
        u.rate   = opts.rate   ?? 0.9;
        u.volume = opts.volume ?? 1;
        u.lang   = opts.lang   ?? 'en-US';

        // Select a matching voice if available
        const voices = this.synth.getVoices();
        const match = voices.find(v => v.lang === u.lang) ||
                      voices.find(v => v.lang.startsWith(u.lang.split('-')[0]));
        if (match) u.voice = match;

        u.onend   = done;
        u.onerror = done;
        this.synth.speak(u);

        // iOS workaround: periodically resume to prevent iOS from pausing speech
        const keepAlive = setInterval(() => {
          if (!this.synth.speaking) { clearInterval(keepAlive); return; }
          this.synth.resume();
        }, 2500);

        // Safety timeout
        setTimeout(() => { clearInterval(keepAlive); done(); }, 5000);
      }, 60);
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

  _playViaWebAudio(blob) {
    return new Promise((resolve) => {
      blob.arrayBuffer().then(buf => {
        const ctx = this.ctx();
        ctx.decodeAudioData(buf, (decoded) => {
          const source = ctx.createBufferSource();
          source.buffer = decoded;
          source.connect(ctx.destination);
          source.onended = resolve;
          source.start(0);
        }, resolve);
      }).catch(resolve);
    });
  },

  playBlob(blob) {
    return new Promise((resolve) => {
      this.stopAudio();
      let resolved = false;
      const done = () => { if (!resolved) { resolved = true; resolve(); } };

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      this._currentAudio = audio;
      audio.setAttribute('playsinline', '');

      audio.onended = () => { URL.revokeObjectURL(url); this._currentAudio = null; done(); };
      audio.onerror = () => {
        URL.revokeObjectURL(url); this._currentAudio = null;
        // Fallback: play via Web Audio API
        this._playViaWebAudio(blob).then(done);
      };
      audio.play().catch(() => {
        URL.revokeObjectURL(url); this._currentAudio = null;
        // Fallback: play via Web Audio API
        this._playViaWebAudio(blob).then(done);
      });
    });
  },

  async playItem(item, moduleType) {
    this.unlock();
    const soundBlob = await media.getSoundBlob(moduleType, item.id);
    if (soundBlob) {
      await this.playBlob(soundBlob);
    } else if (moduleType === 'abc') {
      await this.speak(item.name, { lang: 'es-ES', rate: 0.85 });
    } else if (moduleType === 'animals') {
      await this.speak(item.sound, { pitch: 1.1, rate: 1 });
      await delay(300);
      await this.speak(item.name, { rate: 0.85 });
    } else {
      await this.speak(item.sound, { rate: 0.85 });
    }
  },

  async playQuizClue(item, moduleType) {
    this.unlock();
    const soundBlob = await media.getSoundBlob(moduleType, item.id);
    if (soundBlob) {
      this.playBlob(soundBlob);
    } else if (moduleType === 'abc') {
      this.speak(item.name, { lang: 'es-ES', rate: 0.85 });
    } else if (moduleType === 'animals') {
      this.speak(item.sound, { pitch: 1.1, rate: 1 });
    } else {
      this.speak(item.sound, { rate: 0.85 });
    }
  }
};

// ──────────────── AUDIO RECORDER ────────────────

const recorder = {
  _mediaRecorder: null,
  _chunks: [],
  _stream: null,
  _startTime: 0,
  _timerInterval: null,

  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  },

  async start() {
    this._chunks = [];
    this._stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm'
                   : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '';
    this._mediaRecorder = new MediaRecorder(this._stream, mimeType ? { mimeType } : {});
    this._mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this._chunks.push(e.data);
    };
    this._mediaRecorder.start();
    this._startTime = Date.now();
  },

  stop() {
    return new Promise((resolve) => {
      if (!this._mediaRecorder || this._mediaRecorder.state === 'inactive') {
        this._cleanup();
        resolve(null);
        return;
      }
      this._mediaRecorder.onstop = () => {
        const blob = new Blob(this._chunks, {
          type: this._mediaRecorder.mimeType || 'audio/webm'
        });
        this._cleanup();
        resolve(blob);
      };
      this._mediaRecorder.stop();
    });
  },

  cancel() {
    if (this._mediaRecorder && this._mediaRecorder.state !== 'inactive') {
      this._mediaRecorder.onstop = null;
      this._mediaRecorder.stop();
    }
    this._cleanup();
  },

  _cleanup() {
    if (this._stream) {
      this._stream.getTracks().forEach(t => t.stop());
      this._stream = null;
    }
    this._mediaRecorder = null;
    this._chunks = [];
    clearInterval(this._timerInterval);
    this._timerInterval = null;
  },

  getElapsed() {
    return Math.floor((Date.now() - this._startTime) / 1000);
  },

  formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
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
  if (state.module === 'abc') return getAbcWords();
  const base = state.module === 'animals' ? ANIMALS : FAMILY;
  const custom = state.customItems.filter(i => i.module === state.module);
  return [...base, ...custom];
}

function getAbcWords(letter) {
  const custom = state.abcCustomWords || [];
  const all = [...ABC_WORDS, ...custom];
  if (letter) return all.filter(w => w.letter === letter);
  return all;
}

function getAbcLetterLabel(letter) {
  return letter === 'ñ' ? 'Ñ' : letter.toUpperCase();
}

function getModuleLabel() {
  if (state.module === 'abc') return '🔤 ABC';
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
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function itemExists(mod, id) {
  if (mod === 'abc') {
    if (ABC_WORDS.some(w => w.id === id)) return true;
    return (state.abcCustomWords || []).some(w => w.id === id);
  }
  const builtIn = mod === 'animals' ? ANIMALS : FAMILY;
  if (builtIn.some(i => i.id === id)) return true;
  return state.customItems.some(i => i.module === mod && i.id === id);
}

// ──────────────── PRELOAD MEDIA ────────────────

async function preloadImages() {
  state.imageURLs = {};
  const tasks = [];

  for (const mod of ['animals', 'family']) {
    const base = mod === 'animals' ? ANIMALS : FAMILY;
    const custom = state.customItems.filter(i => i.module === mod);
    for (const item of [...base, ...custom]) {
      tasks.push(media.getImageURL(mod, item.id).then(url => {
        if (url) state.imageURLs[`${mod}/${item.id}`] = url;
      }));
    }
  }

  for (const word of [...ABC_WORDS, ...(state.abcCustomWords || [])]) {
    tasks.push(media.getImageURL('abc', word.id).then(url => {
      if (url) state.imageURLs[`abc/${word.id}`] = url;
    }));
  }

  await Promise.all(tasks);
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
    case 'abcExplore':    app.innerHTML = renderAbcExplore();    break;
    case 'abcQuiz':       app.innerHTML = renderAbcQuiz();       break;
    case 'abcLetterWords':app.innerHTML = renderAbcLetterWords();break;
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
        <div class="menu-card" data-go="menu" data-module="abc">
          <div class="menu-card-emoji">🔤</div>
          <div class="menu-card-label">ABC</div>
        </div>
      </div>
      <button class="settings-btn" data-go="settings">⚙️ Manage</button>
    </div>`;
}

function renderMenu() {
  const isAbc = state.module === 'abc';
  const exploreTarget = isAbc ? 'abcExplore' : 'explore';
  const quizTarget = isAbc ? 'abcQuiz' : 'quiz';
  const quizAction = isAbc ? 'startAbcQuiz' : 'startQuiz';
  const exploreDesc = isAbc ? 'Letras y palabras' : 'Tap to hear sounds';
  const quizDesc = isAbc ? 'Escuchar y adivinar' : 'Listen &amp; guess!';

  return `
    <div class="header">
      <button class="back-btn" data-go="home">◀</button>
      <div class="header-title">${getModuleLabel()}</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="card-row">
        <div class="menu-card" data-go="${exploreTarget}">
          <div class="menu-card-emoji">👆</div>
          <div class="menu-card-label">Explore</div>
          <div class="menu-card-desc">${exploreDesc}</div>
        </div>
        <div class="menu-card" data-go="${quizTarget}" data-action="${quizAction}">
          <div class="menu-card-emoji">🎯</div>
          <div class="menu-card-label">Quiz</div>
          <div class="menu-card-desc">${quizDesc}</div>
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

// ──────────────── ABC EXPLORE (CAROUSEL) ────────────────

function renderAbcExplore() {
  const idx = state.abcLetterIndex;
  const letter = ABC_LETTERS[idx];
  const words = getAbcWords(letter);
  const total = ABC_LETTERS.length;

  const wordCards = words.map(w => {
    const key = `abc/${w.id}`;
    const imgURL = state.imageURLs[key];
    return `
      <div class="abc-word-card" data-word-id="${w.id}"
           style="background:linear-gradient(135deg,${w.color}dd,${w.color}99)">
        ${imgURL
          ? `<img class="abc-word-img" src="${imgURL}" alt="${w.name}" draggable="false">`
          : `<div class="abc-word-placeholder">?</div>`}
      </div>`;
  }).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="menu">◀</button>
      <div class="header-title">🔤 ABC – Explore</div>
      <div class="header-right">${idx + 1} / ${total}</div>
    </div>
    <div class="content">
      <div class="abc-carousel">
        <button class="abc-arrow abc-arrow-left" id="abcPrev" ${idx === 0 ? 'disabled' : ''}>◀</button>
        <div class="abc-letter-display">${getAbcLetterLabel(letter)}</div>
        <button class="abc-arrow abc-arrow-right" id="abcNext" ${idx === total - 1 ? 'disabled' : ''}>▶</button>
      </div>
      <div class="abc-words-grid">${wordCards}</div>
    </div>`;
}

// ──────────────── ABC QUIZ ────────────────

function renderAbcQuiz() {
  const num = `${state.quizIndex + 1} / ${state.quizItems.length}`;
  const opts = state.quizOptions.map(letter => `
    <div class="abc-quiz-option" data-letter="${letter}">
      ${getAbcLetterLabel(letter)}
    </div>`).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="menu">◀</button>
      <div class="header-title">🔤 ABC – Quiz</div>
      <div class="header-right">⭐ ${num}</div>
    </div>
    <div class="content">
      <div class="quiz-wrap">
        <div class="quiz-prompt">¿Con qué letra empieza?</div>
        <button class="play-btn" id="playBtn">🔊</button>
        <div class="abc-quiz-options">${opts}</div>
      </div>
    </div>`;
}

function startAbcQuiz() {
  const allWords = getAbcWords();
  state.quizItems = shuffle(allWords).slice(0, Math.min(10, allWords.length));
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizLocked = false;
  prepareAbcQuestion();
}

function prepareAbcQuestion() {
  const word = state.quizItems[state.quizIndex];
  const correctLetter = word.letter;
  const otherLetters = ABC_LETTERS.filter(l => l !== correctLetter);
  const wrongLetters = shuffle(otherLetters).slice(0, 3);
  state.quizOptions = shuffle([correctLetter, ...wrongLetters]);
  state.quizCorrect = word;
  state.quizLocked = false;
}

function handleAbcQuizAnswer(letter) {
  if (state.quizLocked) return;
  state.quizLocked = true;

  const correct = state.quizCorrect;
  const isRight = letter === correct.letter;

  if (isRight) state.quizScore++;

  document.querySelectorAll('.abc-quiz-option').forEach(el => {
    el.classList.add('disabled');
    if (el.dataset.letter === letter) {
      el.classList.add(isRight ? 'correct' : 'wrong');
    }
    if (el.dataset.letter === correct.letter && !isRight) {
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
      prepareAbcQuestion();
      go('abcQuiz');
      setTimeout(() => sound.playQuizClue(state.quizCorrect, 'abc'), 400);
    } else {
      go('results');
      if (state.quizScore / state.quizItems.length >= 0.7) spawnConfetti();
    }
  }, isRight ? 1200 : 1800);
}

// ──────────────── ABC SETTINGS LETTER WORDS ────────────────

function renderAbcLetterWords() {
  const letter = state.abcSettingsLetter;
  const builtIn = ABC_WORDS.filter(w => w.letter === letter);
  const custom = (state.abcCustomWords || []).filter(w => w.letter === letter);
  const all = [...builtIn, ...custom];

  const items = all.map(w => {
    const key = `abc/${w.id}`;
    const hasImg = !!state.imageURLs[key];
    const isCustom = custom.some(c => c.id === w.id);
    return `
      <div class="settings-item" data-abc-word-id="${w.id}" data-abc-word-letter="${w.letter}">
        <div class="settings-item-visual" style="background:linear-gradient(135deg,${w.color}dd,${w.color}99)">
          ${hasImg
            ? `<img class="settings-item-img" src="${state.imageURLs[key]}" alt="${w.name}" draggable="false">`
            : `<span class="settings-item-emoji">?</span>`}
        </div>
        <div class="settings-item-info">
          <div class="settings-item-name">${w.name}${isCustom ? ' <span class="custom-badge">custom</span>' : ''}</div>
          <div class="settings-item-status">
            ${hasImg ? '🖼️' : '⬜'} Image
          </div>
        </div>
        <div class="settings-item-arrow">▶</div>
      </div>`;
  }).join('');

  return `
    <div class="header">
      <button class="back-btn" data-go="settings">◀</button>
      <div class="header-title">Letra ${getAbcLetterLabel(letter)}</div>
      <div class="header-right"></div>
    </div>
    <div class="settings-list">
      ${items}
      <button class="add-item-btn" id="addAbcWord">+ Add Word</button>
    </div>`;
}

// ──────────────── SETTINGS SCREEN ────────────────

function renderSettings() {
  const tab = state.settingsTab;

  if (tab === 'abc') return renderSettingsAbc();

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
    ${renderSettingsTabs()}
    <div class="settings-list">
      ${items}
      <button class="add-item-btn" data-go="addItem" data-add-module="${tab}">+ Add New ${tab === 'animals' ? 'Animal' : 'Family Member'}</button>
    </div>`;
}

function renderSettingsTabs() {
  const tab = state.settingsTab;
  return `
    <div class="settings-tabs">
      <button class="settings-tab ${tab === 'animals' ? 'active' : ''}" data-tab="animals">🐾 Animals</button>
      <button class="settings-tab ${tab === 'family' ? 'active' : ''}" data-tab="family">👨‍👩‍👧‍👦 Family</button>
      <button class="settings-tab ${tab === 'abc' ? 'active' : ''}" data-tab="abc">🔤 ABC</button>
    </div>`;
}

function renderSettingsAbc() {
  const letters = ABC_LETTERS.map(letter => {
    const words = getAbcWords(letter);
    const count = words.length;
    return `
      <div class="settings-item" data-abc-letter="${letter}">
        <div class="settings-item-visual abc-letter-visual">
          <span class="abc-letter-big">${getAbcLetterLabel(letter)}</span>
        </div>
        <div class="settings-item-info">
          <div class="settings-item-name">Letra ${getAbcLetterLabel(letter)}</div>
          <div class="settings-item-status">${count} palabra${count !== 1 ? 's' : ''}</div>
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
    ${renderSettingsTabs()}
    <div class="settings-list">
      ${letters}
    </div>`;
}

// ──────────────── ITEM EDITOR ────────────────

function renderItemEditor() {
  const item = state.editingItem;
  if (!item) return '';
  const mod = item._module;
  const key = `${mod}/${item.id}`;
  const hasImg = !!state.imageURLs[key];
  const isCustom = mod === 'abc'
    ? (state.abcCustomWords || []).some(w => w.id === item.id)
    : state.customItems.some(c => c.module === mod && c.id === item.id);
  const backTarget = mod === 'abc' ? 'abcLetterWords' : 'settings';

  return `
    <div class="header">
      <button class="back-btn" data-go="${backTarget}">◀</button>
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
          <div class="editor-btns" id="soundBtns">
            <button class="upload-btn" id="recordSound">🎤 Record</button>
            <label class="upload-btn">
              📁 Upload File
              <input type="file" accept="audio/*" id="soundInput" hidden>
            </label>
            <button class="upload-btn" id="previewSound">▶ Preview</button>
            <button class="delete-btn" id="deleteSound" style="display:none">🗑️ Remove</button>
          </div>
          <div id="recordingUI" class="recording-ui" style="display:none">
            <div class="recording-indicator">
              <span class="rec-dot"></span>
              <span id="recTimer">00:00</span>
            </div>
            <div class="recording-btns">
              <button class="upload-btn rec-stop" id="recStop">⏹ Stop</button>
              <button class="delete-btn" id="recCancel">✕ Cancel</button>
            </div>
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
  const isAbc = mod === 'abc';
  const colorBtns = COLOR_PALETTE.map(c =>
    `<button class="color-btn" data-color="${c}" style="background:${c}"></button>`
  ).join('');

  const backTarget = isAbc ? 'abcLetterWords' : 'settings';
  const title = isAbc
    ? `Add Word (${getAbcLetterLabel(state._abcAddLetter || 'a')})`
    : `Add New ${mod === 'animals' ? 'Animal' : 'Family Member'}`;
  const namePlaceholder = isAbc ? 'e.g. Avión' : 'e.g. Tiger';

  return `
    <div class="header">
      <button class="back-btn" data-go="${backTarget}">◀</button>
      <div class="header-title">${title}</div>
      <div class="header-right"></div>
    </div>
    <div class="content">
      <div class="add-form">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input type="text" id="newItemName" class="form-input" placeholder="${namePlaceholder}" autocomplete="off" maxlength="20">
        </div>

        ${!isAbc ? `
        <div class="form-group">
          <label class="form-label">Sound Text (for speech fallback)</label>
          <input type="text" id="newItemSound" class="form-input" placeholder="e.g. Rawr!" autocomplete="off" maxlength="30">
        </div>` : ''}

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

        ${!isAbc ? `
        <div class="form-group">
          <label class="form-label">Sound (optional)</label>
          <div class="editor-btns">
            <button class="upload-btn" type="button" id="newItemRecord">🎤 Record</button>
            <label class="upload-btn">
              📁 Upload File
              <input type="file" accept="audio/*" id="newItemSoundFile" hidden>
            </label>
          </div>
          <div id="newItemRecordingUI" class="recording-ui" style="display:none">
            <div class="recording-indicator">
              <span class="rec-dot"></span>
              <span id="newItemRecTimer">00:00</span>
            </div>
            <div class="recording-btns">
              <button class="upload-btn rec-stop" type="button" id="newItemRecStop">⏹ Stop</button>
              <button class="delete-btn" type="button" id="newItemRecCancel">✕ Cancel</button>
            </div>
          </div>
          <div id="newItemSoundPreview" class="form-preview"></div>
        </div>` : ''}

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
      if (action === 'startAbcQuiz') startAbcQuiz();
      if (addMod) state.settingsTab = addMod;

      go(target);

      if (target === 'quiz') {
        setTimeout(() => sound.playQuizClue(state.quizCorrect, state.module), 500);
      }
      if (target === 'abcQuiz') {
        setTimeout(() => sound.playQuizClue(state.quizCorrect, 'abc'), 500);
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
      if (state.screen === 'abcQuiz') {
        sound.playQuizClue(state.quizCorrect, 'abc');
      } else {
        sound.playQuizClue(state.quizCorrect, state.module);
      }
    });
  }

  // Settings tab buttons
  document.querySelectorAll('.settings-tab').forEach(el => {
    el.addEventListener('click', () => {
      state.settingsTab = el.dataset.tab;
      go('settings');
    });
  });

  // Settings item edit buttons (animals/family)
  document.querySelectorAll('.settings-item[data-edit-id]').forEach(el => {
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

  // Settings ABC letter click — navigate to letter words
  document.querySelectorAll('.settings-item[data-abc-letter]').forEach(el => {
    el.addEventListener('click', () => {
      state.abcSettingsLetter = el.dataset.abcLetter;
      go('abcLetterWords');
    });
  });

  // ABC Explore — carousel arrows
  const abcPrev = document.getElementById('abcPrev');
  const abcNext = document.getElementById('abcNext');
  if (abcPrev) {
    abcPrev.addEventListener('click', () => {
      if (state.abcLetterIndex > 0) {
        state.abcLetterIndex--;
        go('abcExplore');
      }
    });
  }
  if (abcNext) {
    abcNext.addEventListener('click', () => {
      if (state.abcLetterIndex < ABC_LETTERS.length - 1) {
        state.abcLetterIndex++;
        go('abcExplore');
      }
    });
  }

  // ABC Explore — word card tap (speak word)
  document.querySelectorAll('.abc-word-card').forEach(el => {
    el.addEventListener('click', () => {
      const wordId = el.dataset.wordId;
      const allWords = getAbcWords();
      const word = allWords.find(w => w.id === wordId);
      if (!word) return;

      el.classList.remove('playing');
      void el.offsetWidth;
      el.classList.add('playing');

      sound.playItem(word, 'abc');
    });
  });

  // ABC Quiz — letter option tap
  document.querySelectorAll('.abc-quiz-option').forEach(el => {
    el.addEventListener('click', () => handleAbcQuizAnswer(el.dataset.letter));
  });

  // ABC Letter Words settings — word item click (edit word image)
  document.querySelectorAll('.settings-item[data-abc-word-id]').forEach(el => {
    el.addEventListener('click', () => {
      const wordId = el.dataset.abcWordId;
      const letter = el.dataset.abcWordLetter;
      const allWords = getAbcWords(letter);
      const word = allWords.find(w => w.id === wordId);
      if (word) {
        state.editingItem = { ...word, _module: 'abc', emoji: '?' };
        go('editItem');
      }
    });
  });

  // ABC Add word button
  const addAbcWordBtn = document.getElementById('addAbcWord');
  if (addAbcWordBtn) {
    addAbcWordBtn.addEventListener('click', () => {
      state.settingsTab = 'abc';
      state._abcAddLetter = state.abcSettingsLetter;
      go('addItem');
    });
  }

  // Async: check sound status indicators
  if (state.screen === 'settings' && state.settingsTab !== 'abc') {
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
  await Promise.all(all.map(async (it) => {
    const has = await media.hasSound(tab, it.id);
    const el = document.getElementById(`sound-status-${it.id}`);
    if (el) el.textContent = has ? '🔊' : '⬜';
  }));
}

function bindEditor() {
  const imageInput = document.getElementById('imageInput');
  const soundInput = document.getElementById('soundInput');
  const deleteImageBtn = document.getElementById('deleteImage');
  const deleteSoundBtn = document.getElementById('deleteSound');
  const previewSoundBtn = document.getElementById('previewSound');
  const deleteItemBtn = document.getElementById('deleteItem');
  const recordBtn = document.getElementById('recordSound');
  const recordingUI = document.getElementById('recordingUI');
  const soundBtns = document.getElementById('soundBtns');
  const recStop = document.getElementById('recStop');
  const recCancel = document.getElementById('recCancel');
  const recTimer = document.getElementById('recTimer');

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

  // Record sound button
  if (recordBtn && recorder.isSupported()) {
    recordBtn.addEventListener('click', async () => {
      try {
        await recorder.start();
        soundBtns.style.display = 'none';
        recordingUI.style.display = '';
        recorder._timerInterval = setInterval(() => {
          if (recTimer) recTimer.textContent = recorder.formatTime(recorder.getElapsed());
        }, 500);
      } catch (e) {
        alert('Could not access microphone. Please allow microphone access.');
      }
    });
  } else if (recordBtn) {
    recordBtn.style.display = 'none';
  }

  if (recStop) {
    recStop.addEventListener('click', async () => {
      const blob = await recorder.stop();
      if (blob && blob.size > 0) {
        await mediaDB.saveSound(mod, item.id, blob);
      }
      go('editItem');
    });
  }

  if (recCancel) {
    recCancel.addEventListener('click', () => {
      recorder.cancel();
      soundBtns.style.display = '';
      recordingUI.style.display = 'none';
    });
  }

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
      if (mod === 'abc') {
        await mediaDB.deleteAbcWord(item.letter, item.id);
        await mediaDB.deleteImage('abc', item.id);
        state.abcCustomWords = (state.abcCustomWords || []).filter(w => w.id !== item.id);
        delete state.imageURLs[`abc/${item.id}`];
        state.editingItem = null;
        go('abcLetterWords');
      } else {
        await mediaDB.deleteCustomItem(mod, item.id);
        await mediaDB.deleteImage(mod, item.id);
        await mediaDB.deleteSound(mod, item.id);
        state.customItems = state.customItems.filter(i => !(i.module === mod && i.id === item.id));
        delete state.imageURLs[`${mod}/${item.id}`];
        state.editingItem = null;
        go('settings');
      }
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

  // Record sound for new item
  const newRecBtn = document.getElementById('newItemRecord');
  const newRecUI = document.getElementById('newItemRecordingUI');
  const newRecStop = document.getElementById('newItemRecStop');
  const newRecCancel = document.getElementById('newItemRecCancel');
  const newRecTimer = document.getElementById('newItemRecTimer');

  if (newRecBtn && recorder.isSupported()) {
    newRecBtn.addEventListener('click', async () => {
      try {
        await recorder.start();
        newRecBtn.parentElement.style.display = 'none';
        if (newRecUI) newRecUI.style.display = '';
        recorder._timerInterval = setInterval(() => {
          if (newRecTimer) newRecTimer.textContent = recorder.formatTime(recorder.getElapsed());
        }, 500);
      } catch (e) {
        alert('Could not access microphone. Please allow microphone access.');
      }
    });
  } else if (newRecBtn) {
    newRecBtn.style.display = 'none';
  }

  if (newRecStop) {
    newRecStop.addEventListener('click', async () => {
      const blob = await recorder.stop();
      if (blob && blob.size > 0) {
        soundFile = blob;
        const preview = document.getElementById('newItemSoundPreview');
        if (preview) preview.textContent = '✓ Recorded audio';
      }
      if (newRecUI) newRecUI.style.display = 'none';
      if (newRecBtn) newRecBtn.parentElement.style.display = '';
    });
  }

  if (newRecCancel) {
    newRecCancel.addEventListener('click', () => {
      recorder.cancel();
      if (newRecUI) newRecUI.style.display = 'none';
      if (newRecBtn) newRecBtn.parentElement.style.display = '';
    });
  }

  // Save
  saveBtn.addEventListener('click', async () => {
    const nameEl = document.getElementById('newItemName');
    const name = (nameEl.value || '').trim();

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

    if (mod === 'abc') {
      // ABC word add
      const letter = state._abcAddLetter;
      if (itemExists('abc', id)) {
        nameEl.classList.add('error');
        nameEl.placeholder = 'Word already exists!';
        nameEl.value = '';
        return;
      }
      const newWord = { id, name, letter, color: selectedColor };
      await mediaDB.saveAbcWord(newWord);
      if (!state.abcCustomWords) state.abcCustomWords = [];
      state.abcCustomWords.push(newWord);
      if (imageFile) await mediaDB.saveImage('abc', id, imageFile);
      await preloadImages();
      go('abcLetterWords');
      return;
    }

    const soundTextEl = document.getElementById('newItemSound');
    const soundText = (soundTextEl ? soundTextEl.value : '').trim() || name;

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

  // Unlock audio on first user interaction (required by iOS)
  const unlockAudio = () => {
    sound.unlock();
    document.removeEventListener('touchstart', unlockAudio, true);
    document.removeEventListener('touchend', unlockAudio, true);
    document.removeEventListener('click', unlockAudio, true);
  };
  document.addEventListener('touchstart', unlockAudio, true);
  document.addEventListener('touchend', unlockAudio, true);
  document.addEventListener('click', unlockAudio, true);

  await mediaDB.open();
  state.customItems = await mediaDB.getCustomItems();
  state.abcCustomWords = await mediaDB.getAbcWords();

  render();

  // Hide splash screen immediately after first render
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 600);
  }

  // Preload images in background (non-blocking)
  preloadImages().then(() => {
    if (Object.keys(state.imageURLs).length > 0) render();
  });
}

document.addEventListener('DOMContentLoaded', init);
