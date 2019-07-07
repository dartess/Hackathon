import React, {useState} from 'react';
import Header from './components/Header';
import Competentions from './components/Competentions';
import Prognosis from './components/Prognosis';
import './App.scss';
import './img/bg.png';
import './img/circle.png';
import './img/competentions.png';

const regions = [ // todo можно больше
  { value: 'yaroslavl', label: 'Ярославская область' },
  { value: 'kostroma', label: 'Костромская область' },
  { value: 'ivanovo', label: 'Иваноская область' },
];

const directions = [ // todo можно больше
  { value: 'yaroslavl', label: 'Здравоохранение' },
  { value: 'kostroma', label: 'Информационные технологии' },
  { value: 'ivanovo', label: 'Строительство' },
];

const data = [
  {year: '2018', count: 20, additional: {
    shool: [["Выпуск", "716 тыс."]],
    university: [["Гос", "716 тыс."], ["Не гос", "716 тыс."]],
    work: [["Вакансии", "716 тыс."]],
  }},
  {year: '2019', count: 19, additional: {
    shool: [["Выпуск", "71 тыс."]],
    university: [["Гос", "16 тыс."], ["Не гос", "7 тыс."]],
    work: [["Вакансии", "76 тыс."]],
  }},
  {year: '2020', count: 19, additional: {
    shool: [["Выпуск", "716 тыс."]],
    university: [["Гос", "716 тыс."], ["Не гос", "716 тыс."]],
    work: [["Вакансии", "716 тыс."]],
  }},
  {year: '2021', count: 22, additional: {
    shool: [["Выпуск", "716 тыс."]],
    university: [["Гос", "716 тыс."], ["Не гос", "716 тыс."]],
    work: [["Вакансии", "716 тыс."]],
  }},
  {year: '2022', count: 21, additional: {
    shool: [["Выпуск", "716 тыс."]],
    university: [["Гос", "716 тыс."], ["Не гос", "716 тыс."]],
    work: [["Вакансии", "716 тыс."]],
  }},
];

const competensions = {
  old: [
    'Прялка',
  ],
  now: [
    'массив',
    'слов',
  ],
  future: [
    'адронный',
    'коллайдер',
  ],
}

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
        step === 3 || true &&
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
