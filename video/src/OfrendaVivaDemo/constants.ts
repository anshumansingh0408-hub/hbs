// Constants, Theme Colors & Scene Timing for Ofrenda Viva Remotion Video

export const THEME = {
  bgDeep: '#07050A',
  bgSurface: '#120B1A',
  bgCard: 'rgba(24, 16, 34, 0.85)',
  borderGold: 'rgba(255, 183, 3, 0.35)',
  gold: '#FFB703',
  orange: '#FF9E1B',
  fiery: '#FF6F00',
  candleLight: '#FFD166',
  teal: '#06D6A0',
  purple: '#7209B7',
  magenta: '#E63946',
  textLight: '#F8F9FA',
  textMuted: '#94A3B8',
  fontDisplay: "'Cinzel Decorative', Georgia, serif",
  fontPoetic: "'Playfair Display', Georgia, serif",
  fontUi: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
};

export const FPS = 30;

// Scene durations in frames (Total: 900 frames = 30 seconds at 30 fps)
export const SCENE_DURATIONS = {
  hook: 150,          // 0s - 5s: Hook / Problem (The Privacy of Grief)
  architecture: 150,  // 5s - 10s: Open-Source AI Core Architecture
  altarDemo: 240,     // 10s - 18s: 3-Tiered Altar & Interactive Offerings
  oracleDemo: 210,    // 18s - 25s: Local AI Spirit Oracle & Token Streaming
  outro: 150,         // 25s - 30s: Key Metrics, GitHub Link & Call to Action
};
