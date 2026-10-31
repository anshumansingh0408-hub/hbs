// Procedural Web Audio API Soundscape & Ethereal Speech Synthesizer for Ofrenda Viva
// 100% Offline, Zero external audio assets, Pure algorithmic synthesis

class SanctuaryAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.guitarTimer = null;
    this.crackleNode = null;
    this.windNode = null;
    this.masterGain = null;
    this.isSpeaking = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, parseFloat(val)));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.05);
    }
  }

  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    if (!this.ctx) this.init();
    this.isPlaying = true;
    this.startWind();
    this.startCrackle();
    this.startGuitarArpeggios();
  }

  stop() {
    this.isPlaying = false;
    if (this.guitarTimer) {
      clearTimeout(this.guitarTimer);
      this.guitarTimer = null;
    }
    if (this.windNode) {
      try { this.windNode.stop(); } catch (e) {}
      this.windNode = null;
    }
    if (this.crackleNode) {
      try { this.crackleNode.stop(); } catch (e) {}
      this.crackleNode = null;
    }
  }

  // Resonant crystal / brass bowl chime on lighting candles
  playChime(freq = 528) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.503, t); // slight harmonic beating

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.28 * this.volume, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + 3.0);
    osc2.stop(t + 3.0);
  }

  // Marimba wooden resonance for offering interactions
  playMarimba(freq = 440) {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2, t);
    filter.Q.setValueAtTime(8, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.3 * this.volume, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Soft plucked acoustic nylon guitar note
  pluckGuitar(freq, time, duration = 2.0, velocity = 0.2) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.2, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.1, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(velocity * this.volume, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  // Spanish Phrygian / D minor contemplative arpeggios
  startGuitarArpeggios() {
    if (!this.isPlaying) return;

    const chordProgressions = [
      [146.83, 220.00, 293.66, 349.23, 440.00], // Dm
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb
      [130.81, 196.00, 261.63, 329.63, 392.00], // C
      [110.00, 164.81, 220.00, 277.18, 329.63]  // A7
    ];

    let chordIdx = 0;

    const playMeasure = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chord = chordProgressions[chordIdx];
      chordIdx = (chordIdx + 1) % chordProgressions.length;
      const now = this.ctx.currentTime;

      const pattern = [0, 1, 2, 3, 4, 3, 2, 1];
      pattern.forEach((noteIdx, step) => {
        const noteTime = now + (step * 0.42);
        const freq = chord[noteIdx];
        const vel = noteIdx === 0 ? 0.22 : 0.13 + (Math.random() * 0.04);
        this.pluckGuitar(freq, noteTime, 1.8, vel);
      });

      this.guitarTimer = setTimeout(playMeasure, 3600);
    };

    playMeasure();
  }

  // Ambient night breeze
  startWind() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.03 * this.volume, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(100, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.windNode = whiteNoise;
  }

  // Candle fire crackle
  startCrackle() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() > 0.985 ? (Math.random() * 2 - 1) : 0;
    }

    const crackle = this.ctx.createBufferSource();
    crackle.buffer = noiseBuffer;
    crackle.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04 * this.volume, this.ctx.currentTime);

    crackle.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    crackle.start();
    this.crackleNode = crackle;
  }

  // Ethereal recitation using Web Speech API (Local & Offline)
  speakText(text, onEnd = () => {}) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') return;

    // Filter out emoji icons from spoken words
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}✨💀🕯️🌺🏵️🌸🌼📋📜✉️]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.88; // slightly slower, reverent tempo
    utterance.pitch = 0.95;

    // Match Spanish or English voice if available
    const voices = window.speechSynthesis.getVoices();
    const isSpanish = /el|la|los|las|de|en|y|muerte|mictlan|ofrenda/i.test(cleanText);
    const matchedVoice = voices.find(v => isSpanish ? v.lang.startsWith('es') : v.lang.startsWith('en'));
    if (matchedVoice) utterance.voice = matchedVoice;

    this.isSpeaking = true;
    utterance.onend = () => {
      this.isSpeaking = false;
      onEnd();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const soundscape = new SanctuaryAudio();
