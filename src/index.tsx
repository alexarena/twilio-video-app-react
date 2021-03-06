import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Room from './Room';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectOptions, TwilioError } from 'twilio-video';
import ErrorModal from './ErrorModal';
import { isMobile } from './utils';
import theme from './theme';
import './types';
import { VideoProvider } from './VideoProvider';
import { ClassDetailsProvider } from './ClassDetailsContext';

// See: https://media.twiliocdn.com/sdk/js/video/releases/2.0.0/docs/global.html#ConnectOptions
// for available connection options.
const connectionOptions: ConnectOptions = {
  // Bandwidth Profile, Dominant Speaker, and Network Quality
  // features are only available in Small Group or Group Rooms.
  // Please set "Room Type" to "Group" or "Small Group" in your
  // Twilio Console: https://www.twilio.com/console/video/configure
  bandwidthProfile: {
    video: {
      mode: 'presentation',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  networkQuality: { local: 1, remote: 1 },

  // Comment this line if you are playing music.
  maxAudioBitrate: 16000,

  // VP8 simulcast enables the media server in a Small Group or Group Room
  // to adapt your encoded video quality for each RemoteParticipant based on
  // their individual bandwidth constraints. This has no effect if you are
  // using Peer-to-Peer Rooms.
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
};

// For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
if (isMobile && connectionOptions?.bandwidthProfile?.video) {
  connectionOptions!.bandwidthProfile!.video!.maxSubscriptionBitrate = 2500000;
}

const VideoApp = () => {
  const [error, setError] = useState<TwilioError | null>(null);

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorModal dismissError={() => setError(null)} error={error} />
      <Room />
    </VideoProvider>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/room/:URLRoomName">
          <ClassDetailsProvider>
            <VideoApp />
          </ClassDetailsProvider>
        </Route>
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
