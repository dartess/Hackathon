import React from 'react';

import './Title.scss';

export default function Title(props) {
  return (
    <span className="title">{props.children}</span>
  );
}
