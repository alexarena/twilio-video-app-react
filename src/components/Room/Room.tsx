import React from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `260px 1fr`,
  gridTemplateAreas: '". participantList"',
}));

export default function Room() {
  return (
    <Container>
      <ParticipantStrip />
      <MainParticipant />
    </Container>
  );
}
