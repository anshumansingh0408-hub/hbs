import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from './constants';

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const badgeSpring = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const ctaSpring = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  const pulse = Math.sin(frame / 8) * 0.04 + 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 50% 30%, rgba(114, 9, 183, 0.4) 0%, ${THEME.bgDeep} 85%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        color: THEME.textLight,
        fontFamily: THEME.fontUi,
        textAlign: 'center',
      }}
    >
      {/* Icon and Flourish */}
      <div style={{ fontSize: 56, marginBottom: 16 }}>🏵️ 💀 🕯️</div>

      {/* Main Outro Title */}
      <h2
        style={{
          fontFamily: THEME.fontDisplay,
          fontSize: 56,
          lineHeight: 1.2,
          maxWidth: 1200,
          margin: '0 0 20px',
          transform: `scale(${titleSpring})`,
        }}
      >
        Keep Your Memories Free.<br />
        <span
          style={{
            background: 'linear-gradient(135deg, #FFD166, #FF9E1B, #E63946)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Preserve the Ghost in the Open Machine.
        </span>
      </h2>

      <p
        style={{
          fontSize: 22,
          color: THEME.textMuted,
          maxWidth: 880,
          marginBottom: 44,
        }}
      >
        No subscription locks. No surveillance clouds. Just the eternal warmth of open-source software honoring those we love.
      </p>

      {/* Key Proof Metrics Row */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          marginBottom: 48,
          transform: `scale(${badgeSpring})`,
        }}
      >
        <div style={{ background: 'rgba(255, 183, 3, 0.12)', border: `1px solid ${THEME.borderGold}`, padding: '14px 28px', borderRadius: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: THEME.gold }}>100%</div>
          <div style={{ fontSize: 13, color: '#CBD5E1' }}>Client-Side Local AI</div>
        </div>

        <div style={{ background: 'rgba(6, 214, 160, 0.12)', border: '1px solid rgba(6, 214, 160, 0.35)', padding: '14px 28px', borderRadius: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#6EE7B7' }}>0 Servers</div>
          <div style={{ fontSize: 13, color: '#CBD5E1' }}>Zero Telemetry / Full Privacy</div>
        </div>

        <div style={{ background: 'rgba(114, 9, 183, 0.15)', border: '1px solid rgba(199, 125, 255, 0.35)', padding: '14px 28px', borderRadius: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#E0AAFF' }}>60 FPS</div>
          <div style={{ fontSize: 13, color: '#CBD5E1' }}>Marigold & Copal Physics</div>
        </div>

        <div style={{ background: 'rgba(230, 57, 70, 0.12)', border: '1px solid rgba(230, 57, 70, 0.35)', padding: '14px 28px', borderRadius: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#FCA5A5' }}>Web Audio</div>
          <div style={{ fontSize: 13, color: '#CBD5E1' }}>Procedural Spanish Guitar</div>
        </div>
      </div>

      {/* Primary CTA Box */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `scale(${ctaSpring * pulse})`,
        }}
      >
        <a
          href="https://github.com/anshumansingh0408-hub/hbs"
          style={{
            background: 'linear-gradient(135deg, #FFB703, #FF9E1B)',
            color: '#000',
            textDecoration: 'none',
            fontSize: 22,
            fontWeight: 800,
            padding: '18px 44px',
            borderRadius: 999,
            boxShadow: '0 8px 30px rgba(255, 183, 3, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span>🐙</span>
          <span>github.com/anshumansingh0408-hub/hbs</span>
        </a>

        <span style={{ fontSize: 15, color: '#94A3B8' }}>
          Open Source MIT License • Built for DEV Challenge 2026 by Anshuman Singh
        </span>
      </div>
    </div>
  );
};
