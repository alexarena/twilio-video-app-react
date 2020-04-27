import React from 'react';

import useLocalAudioToggle from '../../hooks/useLocalAudioToggle/useLocalAudioToggle';

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

  return (
    <button onClick={toggleAudioEnabled} disabled={props.disabled}>
      {isAudioEnabled ? 'Mute' : 'Unmute'}
    </button>
  );
}
