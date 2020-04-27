import React, { useCallback, useEffect, useState } from 'react';
import useVideoContext from '../hooks/useVideoContext/useVideoContext';

function useSupportsFacingMode(facingMode) {
  const [supportsFacingMode, setSupportsFacingMode] = useState<Boolean | null>(
    null
  );
  useEffect(() => {
    // The 'supportsFacingMode' variable determines if this component is rendered
    // If 'facingMode' exists, we will set supportsFacingMode to true.
    // However, if facingMode is ever undefined again (when the user unpublishes video), we
    // won't set 'supportsFacingMode' to false. This prevents the icon from briefly
    // disappearing when the user switches their front/rear camera.
    if (facingMode && supportsFacingMode === null) {
      setSupportsFacingMode(Boolean(facingMode));
    }
  }, [facingMode, supportsFacingMode]);
  return supportsFacingMode;
}

function useToggleFacingMode(facingMode, videoTrack) {
  const {
    room: { localParticipant },
    getLocalVideoTrack,
  } = useVideoContext();

  return useCallback(() => {
    const localTrackPublication = localParticipant?.unpublishTrack(videoTrack!);
    // TODO: remove when SDK implements this event.
    localParticipant?.emit('trackUnpublished', localTrackPublication);
    videoTrack!.stop();

    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';

    getLocalVideoTrack(newFacingMode).then(newVideoTrack => {
      localParticipant?.publishTrack(newVideoTrack, { priority: 'low' });
    });
  }, [facingMode, getLocalVideoTrack, localParticipant, videoTrack]);
}

export default function FlipCameraButton() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name === 'camera');
  const facingMode = videoTrack?.mediaStreamTrack.getSettings().facingMode;
  const supportsFacingMode = useSupportsFacingMode(facingMode);
  const toggleFacingMode = useToggleFacingMode(facingMode, videoTrack);

  return supportsFacingMode ? (
    <button onClick={toggleFacingMode} disabled={!videoTrack}>
      Flip camera from: {facingMode}
    </button>
  ) : null;
}
