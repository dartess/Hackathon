import React from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { useTime } from 'react-timer-hook';
import {useDropzone} from 'react-dropzone';

import './Header.scss';

const year = new Date().getFullYear();
const date = (new Intl.DateTimeFormat('ru', {month: 'long', day: 'numeric'})).format(Date.now());

export default function Header(props) {
  const {
    step,
    regions,
    region,
    onChangeRegion,
    directions,
    direction,
    onChangeDirection,
    onSelectFile,
  } = props;

  const {
    seconds,
    minutes,
    hours,
  } = useTime();

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({onDrop: onSelectFile});

  return (
    <header className={cn('header', `header--step-${step}`)}>
      <div className={cn('container')}>
        <div className="head-line">
          <div className={cn('logo')}>
            <h1>Название</h1>
            <div>{year} | {date} | {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
          </div>
          <div className="form-success">
            ДАННЫЕ УСПЕШНО ЗАГРУЖЕНЫ
          </div>
        </div>
        <div className={cn('centered', 'form-wrapper')}>
          <div className="form-btn like-link" {...getRootProps()}>
          <input {...getInputProps()} />
          Выберите файл
          </div>
        </div>
        <div className={cn('centered', 'controls')}>
          <div className="controls__item">
            <Select
              className="controls__select"
              classNamePrefix="select"
              placeholder="ГРУППА НАПРАВЛЕНИЙ"
              isSearchable
              value={region}
              onChange={onChangeRegion}
              options={regions}
            />
          </div>
          <div className="controls__item">
            <Select
              className="controls__select"
              classNamePrefix="select"
              placeholder="РЕГИОН"
              isSearchable
              value={direction}
              onChange={onChangeDirection}
              options={directions}
            />
          </div>
        </div>
      </div>
    </header>
  )
}