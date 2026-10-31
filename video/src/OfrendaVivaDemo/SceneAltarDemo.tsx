import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from './BrowserFrame';
import { THEME } from './constants';

export const SceneAltarDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mouse cursor path interpolation
  const mouseX = interpolate(frame, [0, 60, 110, 160, 210], [900, 420, 420, 780, 780], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [0, 60, 110, 160, 210], [600, 260, 260, 430, 430], {
    extrapolateRight: 'clamp',
  });

  // Candle toggle click at frame 60
  const candleClicked = frame >= 60;
  const candleGlow = candleClicked ? Math.sin(frame / 6) * 15 + 40 : 15;

  // Offering modal pop at frame 160
  const modalSpring = spring({ frame: frame - 160, fps, config: { damping: 14 } });
  const showModal = frame >= 160;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: THEME.bgDeep,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 60px',
      }}
    >
      <div style={{ width: 1440, height: 860 }}>
        <BrowserFrame url="http://localhost:5173/sanctuary">
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #180F22 0%, #0A0610 100%)',
              padding: '24px 36px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              fontFamily: THEME.fontUi,
              color: '#fff',
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div>
                <h3 style={{ fontFamily: THEME.fontDisplay, fontSize: 24, color: THEME.gold, margin: 0 }}>
                  🏵️ El Altar de los Tres Niveles
                </h3>
                <span style={{ fontSize: 13, color: '#94A3B8' }}>
                  El Cielo (Espíritus) • La Tierra (Memorias) • El Inframundo (Purificación)
                </span>
              </div>

              {/* Pioneers Pills */}
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: 'rgba(255, 183, 3, 0.25)', border: `1px solid ${THEME.gold}`, padding: '4px 14px', borderRadius: 999, fontSize: 13, color: '#fff' }}>
                  Ada Lovelace
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '4px 14px', borderRadius: 999, fontSize: 13, color: '#94A3B8' }}>
                  Alan Turing
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '4px 14px', borderRadius: 999, fontSize: 13, color: '#94A3B8' }}>
                  Grace Hopper
                </span>
              </div>
            </div>

            {/* TIER 1: EL CIELO */}
            <div
              style={{
                background: 'linear-gradient(180deg, #24160F 0%, #1A0E08 100%)',
                border: '1px solid rgba(255, 183, 3, 0.35)',
                borderRadius: 16,
                padding: '16px 30px',
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Left Candle with Click Trigger */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 16,
                    height: 28,
                    borderRadius: '50% 50% 35% 35%',
                    background: 'radial-gradient(circle, #fff 10%, #FFD166 40%, #FF6F00 80%)',
                    boxShadow: `0 0 ${candleGlow}px #FFB703`,
                    marginBottom: -2,
                  }}
                />
                <div style={{ width: 22, height: 50, background: '#FED7AA', borderRadius: 4 }} />
                <span style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>Luz de Guía</span>
              </div>

              {/* Portrait Centerpiece */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 18,
                    padding: 6,
                    background: 'linear-gradient(135deg, #D4AF37, #AA7C11, #FFD700)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 183, 3, 0.3)',
                    marginBottom: 8,
                  }}
                >
                  <img
                    src="http://localhost:5173/assets/ada_portrait.jpg"
                    alt="Ada Lovelace"
                    style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: 'cover' }}
                  />
                </div>
                <h4 style={{ fontFamily: THEME.fontDisplay, fontSize: 18, margin: 0, color: '#fff' }}>
                  Ada Lovelace
                </h4>
                <span style={{ fontSize: 12, color: THEME.gold }}>1815 – 1852 • Primera Programadora</span>
              </div>

              {/* Right Candle */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 16,
                    height: 28,
                    borderRadius: '50% 50% 35% 35%',
                    background: 'radial-gradient(circle, #fff 10%, #FFD166 40%, #FF6F00 80%)',
                    boxShadow: '0 0 25px #FFB703',
                    marginBottom: -2,
                  }}
                />
                <div style={{ width: 22, height: 50, background: '#FED7AA', borderRadius: 4 }} />
                <span style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>Luz de Memoria</span>
              </div>
            </div>

            {/* TIER 2: LA TIERRA (Offerings) */}
            <div
              style={{
                background: 'linear-gradient(180deg, #1B100A 0%, #140A06 100%)',
                border: '1px solid rgba(255, 183, 3, 0.25)',
                borderRadius: 16,
                padding: '14px 28px',
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="http://localhost:5173/assets/sugar_skull.jpg"
                  alt="Calaverita"
                  style={{ width: 62, height: 62, borderRadius: 10, marginBottom: 4 }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FED7AA' }}>Calaverita de Azúcar</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="http://localhost:5173/assets/pan_de_muerto.jpg"
                  alt="Pan de Muerto"
                  style={{ width: 62, height: 62, borderRadius: 10, marginBottom: 4 }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FED7AA' }}>Pan de Muerto Tradicional</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="http://localhost:5173/assets/cempasuchil.jpg"
                  alt="Cempasúchil"
                  style={{ width: 62, height: 62, borderRadius: 10, marginBottom: 4 }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FED7AA' }}>Flores de Cempasúchil</span>
              </div>
            </div>

            {/* TIER 3: EL INFRAMUNDO */}
            <div
              style={{
                background: 'linear-gradient(180deg, #120906 0%, #0A0503 100%)',
                border: '1px solid rgba(255, 183, 3, 0.2)',
                borderRadius: 16,
                padding: '12px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="http://localhost:5173/assets/copal.jpg"
                  alt="Copal"
                  style={{ width: 56, height: 56, borderRadius: 10, marginBottom: 4 }}
                />
                <span style={{ fontSize: 12, color: '#FED7AA' }}>Copal Sagrado</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, background: 'rgba(56, 189, 248, 0.3)', border: '1px solid #38BDF8', marginBottom: 4 }} />
                <span style={{ fontSize: 12, color: '#FED7AA' }}>Agua Pura</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, background: 'rgba(255, 255, 255, 0.2)', border: '1px solid #fff', marginBottom: 4 }} />
                <span style={{ fontSize: 12, color: '#FED7AA' }}>Sal Bendita</span>
              </div>
            </div>

            {/* Offering Lore Modal (Triggered by click) */}
            {showModal && (
              <div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '25%',
                  width: '50%',
                  background: 'rgba(20, 12, 28, 0.98)',
                  border: `2px solid ${THEME.gold}`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 183, 3, 0.4)',
                  transform: `scale(${modalSpring})`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>🌺</span>
                  <h4 style={{ fontFamily: THEME.fontDisplay, fontSize: 20, color: THEME.gold, margin: 0 }}>
                    Calaverita de Azúcar: El dulce recordatorio de la inmortalidad
                  </h4>
                </div>
                <p style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.6 }}>
                  Elaboradas con azúcar de caña y decoradas con vivos colores, no representan la tristeza de la muerte, sino la dulzura de la vida eterna y la alegría con la que celebramos a quienes amamos.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <span style={{ background: THEME.gold, color: '#000', fontWeight: 700, padding: '6px 16px', borderRadius: 8, fontSize: 12 }}>
                    Aceptar Ofrenda
                  </span>
                </div>
              </div>
            )}

            {/* Animated Mouse Cursor */}
            <div
              style={{
                position: 'absolute',
                left: mouseX,
                top: mouseY,
                pointerEvents: 'none',
                zIndex: 100,
                transition: 'transform 0.1s ease',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill="#FFB703"
                  stroke="#000"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
};
