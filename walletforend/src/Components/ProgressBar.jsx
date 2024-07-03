import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function MyProgressBar(props={value: 0, color: 'success'}) {
  const now = props.value;
  return (
    <div>
      {/* <ProgressBar animated now={props.value} /> */}
      <ProgressBar  striped variant={props.color} now={now} label={`${now}%`} />
    </div>
  );
}





