import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BrowserFrame } from './BrowserFrame';
import { THEME } from './constants';

export const SceneOracleDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const poemText = `💀 CALAVERITA LITERARIA PARA ADA LOVELACE 💀

Estaba la Muerte flaca
mirando una pantalla fría,
buscando cómo programar
su tétrica osamenta al día.

De pronto vio llegar a Ada
con su pluma y su vestido,
y le dijo: "Oye, Calaca,
¡tu algoritmo está podrido!"

"No basta con contar huesos,
ni con sumar calaveras,
hay que tejer melodías
como flores de cempasúchil en primaveras."`;

  // Typewriter streaming effect
  const charCount = Math.floor(interpolate(frame, [15, 140], [0, poemText.length], { extrapolateRight: 'clamp' }));
  const visiblePoem = poemText.substring(0, charCount);

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
        <BrowserFrame url="http://localhost:5173/oracle">
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #180F22 0%, #0A0610 100%)',
              padding: '30px 48px',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: THEME.fontUi,
              color: '#fff',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 32 }}>🔮</span>
                <div>
                  <h3 style={{ fontFamily: THEME.fontDisplay, fontSize: 26, color: THEME.gold, margin: 0 }}>
                    Oráculo del Espíritu: IA de Pesos Abiertos
                  </h3>
                  <span style={{ fontSize: 14, color: '#94A3B8' }}>
                    Inferencia neural en cliente • Sin telemetría • Preservación eterna
                  </span>
                </div>
              </div>

              {/* Engine Badge */}
              <div
                style={{
                  background: 'rgba(114, 9, 183, 0.3)',
                  border: '1px solid rgba(199, 125, 255, 0.5)',
                  color: '#E0AAFF',
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Modelo: SmolLM2-135M-Instruct (WebGPU / WASM)
              </div>
            </div>

            {/* Mode Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                background: 'rgba(12, 8, 18, 0.85)',
                padding: 6,
                borderRadius: 14,
                marginBottom: 20,
              }}
            >
              <div style={{ padding: '10px 0', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                📜 Epitafio Eterno
              </div>
              <div
                style={{
                  padding: '10px 0',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255, 158, 27, 0.4), rgba(114, 9, 183, 0.5))',
                  borderRadius: 10,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  border: `1px solid ${THEME.gold}`,
                }}
              >
                💀 Calaverita Literaria
              </div>
              <div style={{ padding: '10px 0', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                ✉️ Carta / Séance
              </div>
              <div style={{ padding: '10px 0', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                🌺 Guía de Ofrenda
              </div>
            </div>

            {/* Console Output */}
            <div
              style={{
                flex: 1,
                background: 'rgba(7, 4, 10, 0.95)',
                border: `1px solid ${THEME.borderGold}`,
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.9)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px dashed rgba(255, 255, 255, 0.12)',
                  paddingBottom: 10,
                  marginBottom: 16,
                  fontSize: 14,
                  color: '#94A3B8',
                }}
              >
                <span>✦ En comunión con <strong>Ada Lovelace</strong></span>
                <span style={{ color: '#10B981', fontWeight: 600 }}>🔊 Recitación Espiritual Activa</span>
              </div>

              {/* Streaming Poem Text */}
              <div
                style={{
                  flex: 1,
                  fontFamily: THEME.fontPoetic,
                  fontSize: 20,
                  lineHeight: 1.7,
                  color: '#F8FAFC',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {visiblePoem}
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 22,
                    background: THEME.gold,
                    marginLeft: 4,
                    verticalAlign: 'middle',
                    animation: 'blink 1s infinite',
                  }}
                />
              </div>

              {/* Metrics Footer */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: 10,
                  fontSize: 13,
                  color: '#64748B',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Latencia: 0ms • Servidor Externo: NINGUNO • Privacidad: 100%</span>
                <span style={{ color: THEME.gold }}>Tokens por Segundo: 48.2 tok/s</span>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
};
