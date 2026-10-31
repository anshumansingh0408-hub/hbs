import React from 'react';
import { Composition } from 'remotion';
import { OfrendaVivaDemo } from './OfrendaVivaDemo/OfrendaVivaDemo';
import { FPS, SCENE_DURATIONS } from './OfrendaVivaDemo/constants';

const TOTAL_FRAMES =
  SCENE_DURATIONS.hook +
  SCENE_DURATIONS.architecture +
  SCENE_DURATIONS.altarDemo +
  SCENE_DURATIONS.oracleDemo +
  SCENE_DURATIONS.outro;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OfrendaVivaDemo"
        component={OfrendaVivaDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
