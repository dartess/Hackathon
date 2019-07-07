import React, {useState} from 'react';
import cn from 'classnames';
import Title from './Title';
import './Competentions.scss';

const types = [
  {
    type: 'old',
    name: 'устаревшие', 
  },
  {
    type: 'now',
    name: 'актуальные', 
  },
  {
    type: 'future',
    name: 'перспективные', 
  },
]

export default function Competentions({data}) {
  const [isSpoilered, setIsSpoilered] = useState(true);
  const [mode, setMode] = useState(types[1].type)
  return (
    <div className={cn('competentions', 'container', {isSpoilered})}>
      <div className="competentions-title" onClick={() => setIsSpoilered(v => !v)}>
        <Title>Анализ компетенций</Title>
        <svg xmlns="http://www.w3.org/2000/svg" width="292.362" height="292.362" viewBox="0 0 292 292"><path d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"/></svg>
      </div>
      <div className="competentions-content">
        <div className="competentions-group">
          <div className="competentions-select">
            {types.map(({type, name}) => (
              <button
                type="button"
                key={type}
                className={cn({current: type === mode})}
                onClick={() => setMode(type)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="competentions-group">
          <Title>{types.find(({type}) => type === mode).name}</Title>
          <ul className="competentions-list">
            {data[mode].map(text => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
