import React, { useState, useCallback } from 'react';
import AboutDialog from './AboutDialog/AboutDialog';

import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

export default function Menu() {
  const { room, localTracks } = useVideoContext();

  const [aboutOpen, setAboutOpen] = useState(false);

  const handleSignOut = useCallback(() => {
    room.disconnect?.();
    localTracks.forEach(track => track.stop());
  }, [room.disconnect, localTracks]);

  return (
    <div>
      <button onClick={() => setAboutOpen(true)}>About</button>
      <button onClick={handleSignOut}>Logout</button>
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
