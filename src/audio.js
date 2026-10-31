// Procedural Web Audio API Soundscape for Ofrenda Viva
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
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
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

  // Synthesize soft candle chime (Tibetan singing bowl / brass chime)
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
    osc2.frequency.setValueAtTime(freq * 1.5, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.25 * this.volume, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.0);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + 3.2);
    osc2.stop(t + 3.2);
  }

  // Soft plucked acoustic nylon guitar note
  pluckGuitar(freq, time, duration = 2.0, velocity = 0.2) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Warm classical guitar timbre with triangle + lowpass decay
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, time + duration);

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

    // Frequencies for D minor / A Phrygian acoustic chords
    const chordProgressions = [
      // Dm: D3, A3, D4, F4, A4
      [146.83, 220.00, 293.66, 349.23, 440.00],
      // Bb: Bb2, F3, Bb3, D4, F4
      [116.54, 174.61, 233.08, 293.66, 349.23],
      // C: C3, G3, C4, E4, G4
      [130.81, 196.00, 261.63, 329.63, 392.00],
      // A (Dominant): A2, E3, A3, C#4, E4
      [110.00, 164.81, 220.00, 277.18, 329.63]
    ];

    let chordIdx = 0;

    const playMeasure = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chord = chordProgressions[chordIdx];
      chordIdx = (chordIdx + 1) % chordProgressions.length;
      const now = this.ctx.currentTime;

      // Fingerpick pattern: Bass, mid, high, mid, high, mid
      const pattern = [0, 1, 2, 3, 4, 3, 2, 1];
      pattern.forEach((noteIdx, step) => {
        const noteTime = now + (step * 0.42);
        const freq = chord[noteIdx];
        const vel = noteIdx === 0 ? 0.22 : 0.14 + (Math.random() * 0.04);
        this.pluckGuitar(freq, noteTime, 1.8, vel);
      });

      // Next chord in ~3.6s
      this.guitarTimer = setTimeout(playMeasure, 3600);
    };

    playMeasure();
  }

  // Ambient gentle wind
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

    // Subtle wind swell LFO
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
      // sparse random clicks for fire crackling
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
}

export const soundscape = new SanctuaryAudio();
