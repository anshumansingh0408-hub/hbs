import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from './constants';

export const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const node1Spring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const node2Spring = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const node3Spring = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const node4Spring = spring({ frame: frame - 60, fps, config: { damping: 12 } });

  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 50% 30%, rgba(255, 111, 0, 0.22) 0%, ${THEME.bgDeep} 80%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        color: THEME.textLight,
        fontFamily: THEME.fontUi,
      }}
    >
      {/* Eyebrow */}
      <span
        style={{
          fontFamily: THEME.fontDisplay,
          color: THEME.gold,
          fontSize: 18,
          letterSpacing: 2,
          marginBottom: 12,
          opacity: interpolate(frame, [0, 20], [0, 1]),
        }}
      >
        EL ALMA ABIERTA EN LA MÁQUINA
      </span>

      {/* Main Solution Title */}
      <h2
        style={{
          fontFamily: THEME.fontDisplay,
          fontSize: 54,
          textAlign: 'center',
          maxWidth: 1200,
          margin: '0 0 16px',
          transform: `scale(${titleSpring})`,
        }}
      >
        Meet <span style={{ color: THEME.gold }}>Ofrenda Viva</span>: Complete Air-Gapped Memorial Architecture
      </h2>

      <p
        style={{
          fontSize: 20,
          color: THEME.textMuted,
          maxWidth: 880,
          textAlign: 'center',
          marginBottom: 50,
        }}
      >
        Powered by client-side open-weight models, procedural Web Audio synthesis, and real-time canvas particle physics.
      </p>

      {/* Architecture Flow Pipeline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          maxWidth: 1450,
        }}
      >
        {/* Node 1: Private Client */}
        <div
          style={{
            flex: 1,
            background: 'rgba(20, 14, 28, 0.9)',
            border: `1px solid ${THEME.borderGold}`,
            borderRadius: 20,
            padding: '24px 20px',
            textAlign: 'center',
            transform: `scale(${node1Spring})`,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>💻</div>
          <h4 style={{ fontSize: 20, color: '#fff', marginBottom: 6 }}>100% In-Browser</h4>
          <p style={{ fontSize: 14, color: '#CBD5E1' }}>Runs on your laptop in Airplane Mode. Zero remote servers.</p>
        </div>

        <div style={{ fontSize: 28, color: THEME.gold }}>➔</div>

        {/* Node 2: 3-Tiered Altar State */}
        <div
          style={{
            flex: 1,
            background: 'rgba(20, 14, 28, 0.9)',
            border: `1px solid ${THEME.borderGold}`,
            borderRadius: 20,
            padding: '24px 20px',
            textAlign: 'center',
            transform: `scale(${node2Spring})`,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>🕯️</div>
          <h4 style={{ fontSize: 20, color: '#fff', marginBottom: 6 }}>3-Tiered Altar</h4>
          <p style={{ fontSize: 14, color: '#CBD5E1' }}>Interactive velas, offerings, sugar skulls, and copal incense.</p>
        </div>

        <div style={{ fontSize: 28, color: THEME.gold }}>➔</div>

        {/* Node 3: Procedural Audio & Canvas */}
        <div
          style={{
            flex: 1,
            background: 'rgba(20, 14, 28, 0.9)',
            border: `1px solid ${THEME.borderGold}`,
            borderRadius: 20,
            padding: '24px 20px',
            textAlign: 'center',
            transform: `scale(${node3Spring})`,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎸</div>
          <h4 style={{ fontSize: 20, color: '#fff', marginBottom: 6 }}>Web Audio & Physics</h4>
          <p style={{ fontSize: 14, color: '#CBD5E1' }}>Acoustic guitar arpeggios + 60 FPS cempasúchil particle physics.</p>
        </div>

        <div style={{ fontSize: 28, color: THEME.gold }}>➔</div>

        {/* Node 4: Local Open AI Engine */}
        <div
          style={{
            flex: 1.2,
            background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.4), rgba(255, 111, 0, 0.4))',
            border: `2px solid ${THEME.gold}`,
            borderRadius: 20,
            padding: '26px 22px',
            textAlign: 'center',
            transform: `scale(${node4Spring * pulse})`,
            boxShadow: `0 16px 40px rgba(255, 183, 3, 0.25)`,
          }}
        >
          <div style={{ fontSize: 42, marginBottom: 10 }}>🔮</div>
          <h4 style={{ fontSize: 22, color: THEME.gold, marginBottom: 6 }}>Espíritu Local AI</h4>
          <p style={{ fontSize: 14, color: '#F8F9FA' }}>
            Open-weight models synthesize eulogies, calaveritas, and letters with 0ms cloud latency.
          </p>
        </div>
      </div>
    </div>
  );
};
