import React from 'react';
import { THEME } from './constants';

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = 'http://localhost:5173/',
  children,
  width = '100%',
  height = '100%',
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 20,
        overflow: 'hidden',
        background: THEME.bgSurface,
        border: `1px solid ${THEME.borderGold}`,
        boxShadow: `0 24px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 183, 3, 0.15)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          height: 48,
          background: 'rgba(18, 11, 26, 0.95)',
          borderBottom: `1px solid ${THEME.borderGold}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 16,
          flexShrink: 0,
        }}
      >
        {/* macOS Control Dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
        </div>

        {/* URL Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 620,
            margin: '0 auto',
            height: 30,
            background: 'rgba(7, 4, 11, 0.85)',
            border: '1px solid rgba(255, 183, 3, 0.25)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
            fontSize: 13,
            color: '#CBD5E1',
            fontFamily: THEME.fontUi,
          }}
        >
          <span style={{ color: '#10B981', fontSize: 12 }}>🔒</span>
          <span style={{ color: '#FFD166', fontWeight: 600 }}>localhost:5173</span>
          <span style={{ color: '#64748B' }}>/sanctuary • 100% Offline Air-Gapped</span>
        </div>

        {/* Status Pill */}
        <div
          style={{
            background: 'rgba(6, 214, 160, 0.15)',
            border: '1px solid rgba(6, 214, 160, 0.4)',
            color: '#6EE7B7',
            padding: '3px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: THEME.fontUi,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06D6A0', boxShadow: '0 0 6px #06D6A0' }} />
          Local AI Active
        </div>
      </div>

      {/* Viewport Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
