import React, {useState} from 'react';
import Header from './components/Header';
import Competentions from './components/Competentions';
import Prognosis from './components/Prognosis';
import './App.scss';
import './img/bg.png';
import './img/circle.png';
import './img/competentions.png';

import regions from './data/regions.json';
import directions from './data/directions.json';
import data from './data/personnel.json';
import competensions from './data/competensions.json';

function App() {
  const [region, setRegion] = useState(null);
  const [direction, setDirection] = useState(null);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const step = isFileLoaded ? (region && direction ? 3 : 2) : 1; 
  const onSelectFile = () => {
    setIsFileLoaded(true);
  }
  return (
    <div className="App">
      <Header
        step={step}
        regions={regions}
        region={region}
        onChangeRegion={setRegion}
        directions={directions}
        direction={direction}
        onChangeDirection={setDirection}
        onSelectFile={onSelectFile}
      />
      {
        step === 3 &&
        <>
          <Competentions
            data={competensions}
          />
          <Prognosis
            data={data}
          />
        </>
      }
    </div>
  );
}

export default App;
