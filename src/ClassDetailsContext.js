import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';

const ClassDetailsContext = createContext(null);

function doFetch(endpoint, opts = {}) {
  const headers = new Headers({
    'Key-Inflection': 'camel',
    Authorization: `Bearer ${getAuthToken(document.cookie)}`,
  });
  return fetch(endpoint, { ...opts, headers });
}

function getAuthToken(cookieStr) {
  for (const str of cookieStr.split(';')) {
    const [key, value] = str.split('=');
    if (key.trim() === 'auth_token') {
      return value;
    }
  }
  return null;
}

async function getClassDetails(roomName) {
  const resp = await doFetch(`/class_sessions/${roomName}`);
  const json = await resp.json();
  return json;
}

export default function useClassDetails() {
  const context = useContext(ClassDetailsContext);
  return context;
}

export function ClassDetailsProvider({ children }) {
  const [classDetails, setClassDetails] = useState(null);
  const { URLRoomName } = useParams();

  useEffect(() => {
    if (URLRoomName) {
      getClassDetails(URLRoomName).then(details => setClassDetails(details));
    }
  }, [URLRoomName]);

  return <ClassDetailsContext.Provider value={classDetails}>{children}</ClassDetailsContext.Provider>;
}
