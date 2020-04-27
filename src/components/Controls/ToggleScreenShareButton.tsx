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

  // Checking if screen is shared changed in 302991a7f8ef612d874853291859b98fc19d5097
  // If this behavior is buggy, that commit may be why
  const isScreenShared =
    screenShareParticipant && screenShareParticipant === room.localParticipant;

  return (
    <button onClick={toggleScreenShare} disabled={isDisabled}>
      {isScreenShared ? 'Stop screen sharing' : 'Start screen sharing'}
    </button>
  );
}
