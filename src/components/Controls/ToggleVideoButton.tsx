import React from 'react';

import useLocalVideoToggle from '../../hooks/useLocalVideoToggle/useLocalVideoToggle';

export default function ToggleVideoButton(props: { disabled?: boolean }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

  return (
    <button onClick={toggleVideoEnabled} disabled={props.disabled}>
      {isVideoEnabled ? 'Turn video off' : 'Turn video on'}
    </button>
  );
}
