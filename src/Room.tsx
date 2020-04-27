import React, { useState, useCallback } from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import AboutModal from './components/AboutDialog';

import ParticipantStrip from './components/ParticipantStrip/ParticipantStrip';
import MainParticipant from './components/MainParticipant/MainParticipant';

import useVideoContext from './hooks/useVideoContext/useVideoContext';
import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import useClassDetails from './ClassDetailsContext';
import ToggleFullscreenButton from './components/ToggleFullScreenButton';
import LocalAudioLevelIndicator from './components/LocalAudioLevelIndicator';
import FlipCameraButton from './components/FlipCameraButton';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
});

const RoomContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `260px 1fr`,
  gridTemplateAreas: '". participantList"',
}));

const Main = styled('main')({
  overflow: 'hidden',
});

function AboutModalButton() {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <>
      <button onClick={() => setAboutOpen(true)}>About</button>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}

function LogoutButton() {
  const { room, localTracks } = useVideoContext();
  const handleSignOut = useCallback(() => {
    room.disconnect?.();
    localTracks.forEach(track => track.stop());
  }, [room.disconnect, localTracks]);

  return <button onClick={handleSignOut}>Logout</button>;
}

function JoinButton() {
  const { connect } = useVideoContext();
  const classDetails = useClassDetails();

  React.useEffect(() => {
    console.log('class details', classDetails);
  }, [classDetails]);

  function join() {
    if (classDetails?.twilioToken) {
      connect(classDetails?.twilioToken);
    }
  }

  return (
    <button disabled={!classDetails} onClick={join}>
      Join
    </button>
  );
}

export default function App() {
  const roomState = useRoomState();
  // useConnectToRoom(classDetails?.twilioToken);

  React.useEffect(() => {
    console.log('room state', roomState);
  }, [roomState]);

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  return (
    <Container style={{ height }}>
      <div>
        <AboutModalButton />
        <LogoutButton />
        <JoinButton />
        <ToggleFullscreenButton />
        <FlipCameraButton />
        <LocalAudioLevelIndicator />
        <span>
          <strong>Room state:</strong>
          {roomState}
        </span>
      </div>
      <Main>
        {roomState === 'disconnected' ? (
          <LocalVideoPreview />
        ) : (
          <RoomContainer>
            <ParticipantStrip />
            <MainParticipant />
          </RoomContainer>
        )}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
