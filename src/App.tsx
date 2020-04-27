import React, { useEffect } from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';
import Menu from './components/MenuBar/Menu';

import useVideoContext from './hooks/useVideoContext/useVideoContext';
import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import usePrevious from './hooks/usePrevious';
import useClassDetails from './ClassDetailsContext';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
  overflow: 'hidden',
});

function useConnectToRoom(token) {
  const { connect } = useVideoContext();
  const previousToken = usePrevious(token);
  useEffect(() => {
    if (token && previousToken !== token) {
      console.log('connecting');
      connect(token);
    }
  }, [previousToken, token, connect]);
}

export default function App() {
  const classDetails = useClassDetails();
  const roomState = useRoomState();
  useConnectToRoom(classDetails?.twilioToken);

  React.useEffect(() => {
    console.log('class details', classDetails);
  }, [classDetails]);

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
      <Menu />
      <Main>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
