import React from 'react';
import { Sequence } from 'remotion';
import { SCENE_DURATIONS } from './constants';
import { SceneHook } from './SceneHook';
import { SceneArchitecture } from './SceneArchitecture';
import { SceneAltarDemo } from './SceneAltarDemo';
import { SceneOracleDemo } from './SceneOracleDemo';
import { SceneOutro } from './SceneOutro';

export const OfrendaVivaDemo: React.FC = () => {
  let currentFrame = 0;

  const hookStart = currentFrame;
  currentFrame += SCENE_DURATIONS.hook;

  const archStart = currentFrame;
  currentFrame += SCENE_DURATIONS.architecture;

  const altarStart = currentFrame;
  currentFrame += SCENE_DURATIONS.altarDemo;

  const oracleStart = currentFrame;
  currentFrame += SCENE_DURATIONS.oracleDemo;

  const outroStart = currentFrame;

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#07050A' }}>
      {/* Scene 1: Hook & Grief Privacy */}
      <Sequence from={hookStart} durationInFrames={SCENE_DURATIONS.hook}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: Open-Source AI Architecture */}
      <Sequence from={archStart} durationInFrames={SCENE_DURATIONS.architecture}>
        <SceneArchitecture />
      </Sequence>

      {/* Scene 3: Live 3-Tiered Altar Walkthrough */}
      <Sequence from={altarStart} durationInFrames={SCENE_DURATIONS.altarDemo}>
        <SceneAltarDemo />
      </Sequence>

      {/* Scene 4: Local AI Spirit Oracle Demo */}
      <Sequence from={oracleStart} durationInFrames={SCENE_DURATIONS.oracleDemo}>
        <SceneOracleDemo />
      </Sequence>

      {/* Scene 5: Outro, Proof Metrics & GitHub CTA */}
      <Sequence from={outroStart} durationInFrames={SCENE_DURATIONS.outro}>
        <SceneOutro />
      </Sequence>
    </div>
  );
};
