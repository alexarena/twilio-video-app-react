import React from 'react';

import EndCallButton from './EndCallButton';
import ToggleAudioButton from './ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton';
import ToggleScreenShareButton from './ToggleScreenShareButton';

import useIsUserActive from '../../hooks/useIsUserActive';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import ToggleFullscreenButton from './ToggleFullScreenButton';
import FlipCameraButton from './FlipCameraButton';
import JoinButton from './JoinButton';

const Container = ({ ...rest }) => {
  return (
    <div
      style={{
        position: 'absolute',
        padding: 20,
        bottom: 32,
        left: '50%',
        background: 'blue',
        zIndex: 1,
      }}
      {...rest}
    />
  );
};

export default function Controls() {
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === 'disconnected';

  if (!showControls) {
    return null;
  }

  return (
    <Container>
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      <ToggleFullscreenButton />
      <FlipCameraButton />
      {roomState !== 'disconnected' ? (
        <>
          <ToggleScreenShareButton disabled={isReconnecting} />
          <EndCallButton />
        </>
      ) : (
        <JoinButton />
      )}
    </Container>
  );
}
