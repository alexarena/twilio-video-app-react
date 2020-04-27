import React, { createContext, useContext, useState } from 'react';
import { TwilioError } from 'twilio-video';
import { User } from 'firebase';

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

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(room: string): Promise<string>;
  user?:
    | User
    | null
    | { displayName: undefined; photoURL: undefined; passcode?: string };
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  let contextValue = {
    error,
    setError,
    isFetching,
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async roomName => {
      console.log('getting tok for ', roomName);
      const resp = await doFetch(`/class_sessions/${roomName}`);
      const json = await resp.json();
      const token = json.twilioToken;

      return token;
    },
  };

  const getToken: StateContextType['getToken'] = room => {
    setIsFetching(true);
    return contextValue
      .getToken(room)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
