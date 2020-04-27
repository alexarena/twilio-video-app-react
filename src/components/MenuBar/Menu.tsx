import React, { useState, useRef, useCallback } from 'react';
import AboutDialog from './AboutDialog/AboutDialog';
import IconButton from '@material-ui/core/IconButton';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

export default function Menu() {
  const { room, localTracks } = useVideoContext();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleSignOut = useCallback(() => {
    room.disconnect?.();
    localTracks.forEach(track => track.stop());
  }, [room.disconnect, localTracks]);

  return (
    <div ref={anchorRef}>
      <button onClick={() => setMenuOpen(state => !state)}>Toggle Menu</button>
      <IconButton
        color="inherit"
        onClick={() => setMenuOpen(state => !state)}
      ></IconButton>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(state => !state)}
        anchorEl={anchorRef.current}
      >
        <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
    </div>
  );
}
