import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from './constants';

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });

  const card1Spring = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const card2Spring = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const card3Spring = spring({ frame: frame - 65, fps, config: { damping: 12 } });

  const floatY = Math.sin(frame / 15) * 8;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 50% 20%, rgba(114, 9, 183, 0.3) 0%, ${THEME.bgDeep} 75%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        position: 'relative',
        color: THEME.textLight,
        fontFamily: THEME.fontUi,
      }}
    >
      {/* Top Festival Ribbon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 20px',
          background: 'rgba(255, 183, 3, 0.12)',
          border: `1px solid ${THEME.borderGold}`,
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 600,
          color: THEME.gold,
          marginBottom: 28,
          opacity: titleOpacity,
        }}
      >
        <span>🏵️</span>
        <span>GHOST IN THE MACHINE • DÍA DE LOS MUERTOS 2026</span>
        <span>🕯️</span>
      </div>

      {/* Main Hook Question */}
      <h1
        style={{
          fontFamily: THEME.fontDisplay,
          fontSize: 64,
          lineHeight: 1.15,
          textAlign: 'center',
          maxWidth: 1300,
          margin: '0 0 24px',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: '0 8px 30px rgba(0, 0, 0, 0.85)',
        }}
      >
        Where Do Our Memories Go When{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #FFD166, #FF9E1B, #E63946)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Cloud Goes Dark?
        </span>
      </h1>

      <p
        style={{
          fontSize: 22,
          color: THEME.textMuted,
          maxWidth: 950,
          textAlign: 'center',
          margin: '0 0 50px',
          opacity: titleOpacity,
        }}
      >
        When preserving the sacred memory of our ancestors, proprietary AI clouds sell our grief, lock our photos behind paywalls, and fail when the power goes out.
      </p>

      {/* Problem Cards Trio */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          width: '100%',
          maxWidth: 1400,
          transform: `translateY(${floatY}px)`,
        }}
      >
        {/* Problem Card 1 */}
        <div
          style={{
            background: 'rgba(26, 14, 30, 0.85)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: 20,
            padding: '28px 24px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
            opacity: Math.max(0, card1Spring),
            transform: `translateY(${(1 - card1Spring) * 40}px)`,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
          <h3 style={{ fontSize: 22, color: '#FCA5A5', marginBottom: 8, fontWeight: 700 }}>
            Zero Grief Privacy
          </h3>
          <p style={{ fontSize: 16, color: '#CBD5E1', lineHeight: 1.5 }}>
            Personal memoirs, family photos, and heartfelt letters fed into centralized corporate training sets.
          </p>
        </div>

        {/* Problem Card 2 */}
        <div
          style={{
            background: 'rgba(26, 14, 30, 0.85)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 20,
            padding: '28px 24px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
            opacity: Math.max(0, card2Spring),
            transform: `translateY(${(1 - card2Spring) * 40}px)`,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
          <h3 style={{ fontSize: 22, color: '#FDE68A', marginBottom: 8, fontWeight: 700 }}>
            API Obsolescence
          </h3>
          <p style={{ fontSize: 16, color: '#CBD5E1', lineHeight: 1.5 }}>
            Proprietary services change pricing, revoke API keys, or disappear, erasing digital tributes forever.
          </p>
        </div>

        {/* Problem Card 3 */}
        <div
          style={{
            background: 'rgba(26, 14, 30, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: 20,
            padding: '28px 24px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
            opacity: Math.max(0, card3Spring),
            transform: `translateY(${(1 - card3Spring) * 40}px)`,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌐</div>
          <h3 style={{ fontSize: 22, color: '#E9D5FF', marginBottom: 8, fontWeight: 700 }}>
            Cloud Tethering
          </h3>
          <p style={{ fontSize: 16, color: '#CBD5E1', lineHeight: 1.5 }}>
            Ceremonies at gravesides or in rural candlelit rooms fail without high-speed internet connection.
          </p>
        </div>
      </div>
    </div>
  );
};
