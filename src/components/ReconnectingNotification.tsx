import React from 'react';

import useRoomState from '../hooks/useRoomState/useRoomState';

export default function ReconnectingNotification() {
  const roomState = useRoomState();

  if (roomState !== 'reconnecting') {
    return (
      <div
        style={{ position: 'absolute', bottom: 0, left: 0, background: 'red' }}
      >
        Reconnecting...
      </div>
    );
  }
  return null;
}
