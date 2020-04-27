import { useEffect } from 'react';

import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import usePrevious from '../../hooks/usePrevious';

export default function MenuBar() {
  const { URLRoomName } = useParams();
  const previousRoomName = usePrevious(URLRoomName);
  const { getToken } = useAppState();
  const { connect } = useVideoContext();

  useEffect(() => {
    if (previousRoomName !== URLRoomName) {
      getToken(URLRoomName).then(token => connect(token));
    }
  }, [URLRoomName, previousRoomName, getToken, connect]);

  return null;
}
