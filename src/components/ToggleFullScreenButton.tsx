import React from 'react';

import useFullScreenToggle from '../hooks/useFullScreenToggle/useFullScreenToggle';

export default function ToggleFullscreenButton() {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return (
    <button aria-label="full screen" onClick={toggleFullScreen}>
      {isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
    </button>
  );
}
