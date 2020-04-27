import React from 'react';

import useScreenShareToggle from '../../hooks/useScreenShareToggle/useScreenShareToggle';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

export default function ToggleScreenShareButton(props: { disabled?: boolean }) {
  const [, toggleScreenShare] = useScreenShareToggle();
  const screenShareParticipant = useScreenShareParticipant();
  const { room } = useVideoContext();

  const disableScreenShareButton =
    screenShareParticipant && screenShareParticipant !== room.localParticipant;

  const isScreenShareSupported =
    navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;

  const isDisabled =
    props.disabled || disableScreenShareButton || !isScreenShareSupported;

  const isScreenShared =
    screenShareParticipant && screenShareParticipant === room.localParticipant;

  return (
    <button onClick={toggleScreenShare} disabled={isDisabled}>
      {isScreenShared ? 'Stop screen sharing' : 'Start screen sharing'}
    </button>
  );
}
