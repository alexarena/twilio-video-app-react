import React from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useClassDetails from '../../ClassDetailsContext';

export default function JoinButton() {
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
