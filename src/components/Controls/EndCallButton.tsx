import React from 'react';

import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

export default function EndCallButton() {
  const { room } = useVideoContext();

  return <button onClick={() => room.disconnect()}>End Call</button>;
}
