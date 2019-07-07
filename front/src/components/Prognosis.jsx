import React, {useState} from 'react';
import Title from './Title';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './Prognosis.scss';

export default function Prognosis({data}) {
  const [year, setYear] = useState(data[1].year);
  const yearInfo = data.find(({year: fYear}) => fYear == year);
  
  return (
    <>
      <div className="prognosis container">
        <Title>Прогноз необходимого количества преподавателей</Title>
        <LineChart 
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          className="chart"
        >
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{fontSize: 12}}
            onClick={({value}) => setYear(value)}
          />
          <YAxis
            domain={['dataMin - 3', 'dataMax + 3']}
            tick={{fontSize: 12}}
          />
          <Line
            type="linear"
            strokeWidth={2}
            dot={{stroke: '#000', strokeWidth: 3, r: 2}}
            activeDot={{stroke: '#000', strokeWidth: 3, r: 2}}
            dataKey="count"
            stroke="#000000"
          />
          <Tooltip cursor={false} />
        </LineChart>
      </div>
      <div className="info-wrap">
        <div>
          Школа
        </div>
        <div>
          Университет
        </div>
        <div>
          Работа
        </div>
      </div>
      <hr className="info-line"/>
      <div className="info-wrap">
        <div className="info-values-group">
          {yearInfo.additional.shool.map(([title, value]) => (
            <div className="info-item" key={title}>
              <span className="info-item-title">{title}</span>
              <span className="info-item-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="info-values-group">
          {yearInfo.additional.university.map(([title, value]) => (
            <div className="info-item" key={title}>
              <span className="info-item-title">{title}</span>
              <span className="info-item-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="info-values-group">
          {yearInfo.additional.work.map(([title, value]) => (
            <div className="info-item" key={title}>
              <span className="info-item-title">{title}</span>
              <span className="info-item-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
