'use client';
import { distances } from '@/data/distances';
import { useMemo, useState } from 'react';

export default function Home() {
  const [minutes, setMinutes] = useState<string>('6');
  const [seconds, setSeconds] = useState<string>('0');

  const speed = useMemo(() => {
    const min = minutes ? parseInt(minutes) : 6;
    const sec = seconds ? parseInt(seconds) : 0;
    return String((3600 / (sec + min * 60)).toFixed(2));
  }, [minutes, seconds]);

  const calculatedDistances = useMemo(() => {
    const min = minutes ? parseInt(minutes) : 6;
    const sec = seconds ? parseInt(seconds) : 0;
    const totalSec = sec + min * 60;
    return distances.map((object) => {
      return totalSec * (object.distance / 1000);
    });
  }, [minutes, seconds]);

  const format = (toParse: number) => {
    return `${String(Math.floor(toParse / 3600)).padStart(2, '0')}:${String(Math.floor((toParse % 3600) / 60)).padStart(
      2,
      '0'
    )}:${String((toParse % 60).toFixed(0)).padStart(2, '0')}`;
  };

  const handleChangeMinutes = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setMinutes('');
      return;
    }
    const val = parseInt(event.currentTarget.value);
    if (val < 60 && val > -1) {
      setMinutes(event.currentTarget.value);
    }
  };

  const handleChangeSeconds = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setSeconds('');
      return;
    }
    const val = parseInt(event.currentTarget.value);
    if (val < 60 && val > -1) {
      setSeconds(event.currentTarget.value);
    }
  };

  const increment = (isMinutes: boolean) => {
    if (isMinutes) {
      if (parseInt(minutes) + 1 < 60) {
        setMinutes((parseInt(minutes) + 1).toString());
      }
    } else {
      if (parseInt(seconds) + 1 < 60) {
        setSeconds((parseInt(seconds) + 1).toString());
      }
    }
  };

  const decrement = (isMinutes: boolean) => {
    if (isMinutes) {
      if (parseInt(minutes) - 1 > -1) {
        setMinutes((parseInt(minutes) - 1).toString());
      }
    } else {
      if (parseInt(seconds) - 1 > -1) {
        setSeconds((parseInt(seconds) - 1).toString());
      }
    }
  };

  const reset = () => {
    setMinutes('6');
    setSeconds('0');
  }

  return (
    <div className='flex flex-col justify-start h-full items-center'>
      <h1 className='text-5xl py-6'>Pace (min/km) to Speed (km/h)</h1>
      <div className='text-3xl flex flex-row w-full p-10 justify-around'>
        <div className='w-1/2 flex flex-col items-center'>
          <div className='flex flex-row p-4'>
            <div className='px-4'>
              <label htmlFor='minutes' className='flex justify-center text-sm font-medium leading-6 text-light-text'>
                Minutes
              </label>
              <div className='flex flex-row'>
                <input
                  value={minutes}
                  onChange={handleChangeMinutes}
                  type='number'
                  name='minutes'
                  id='minutes'
                  className='block w-16 rounded-md py-1.5 pl-2 text-light-text placeholder:text-gray-400 bg-second focus:outline-none'
                  placeholder='6'
                />
                <div className='flex flex-col ml-2 justify-between'>
                  <button
                    className='w-6 h-9 bg-second rounded-md mb-1 hover:bg-main'
                    id='incrementMinutes'
                    onClick={() => increment(true)}
                  >
                    <span>+</span>
                  </button>
                  <button
                    className='w-6 h-9 bg-second rounded-md mt-1 hover:bg-main'
                    id='decrementMinutes'
                    onClick={() => decrement(true)}
                  >
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='px-4'>
              <label htmlFor='seconds' className='flex justify-center text-sm font-medium leading-6 text-light-text'>
                Seconds
              </label>
              <div className='flex flex-row'>
                <input
                  value={seconds}
                  onChange={handleChangeSeconds}
                  type='number'
                  name='seconds'
                  id='seconds'
                  className='block w-16 rounded-md py-1.5 pl-2 text-light-text placeholder:text-gray-400 bg-second focus:outline-none'
                  placeholder='00'
                />
                <div className='flex flex-col ml-2 justify-between'>
                  <button
                    className='w-6 h-9 bg-second rounded-md mb-1 hover:bg-main'
                    id='incrementSeconds'
                    onClick={() => increment(false)}
                  >
                    <span>+</span>
                  </button>
                  <button
                    className='w-6 h-9 bg-second rounded-md mt-1 hover:bg-main'
                    id='decrementSeconds'
                    onClick={() => decrement(false)}
                  >
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-center'>
          <div className='flex flex-row mt-8'>
            <div>
              <label htmlFor='minutes' className='flex justify-center text-sm font-medium leading-6 text-light-text'>
                km/h
              </label>
              <div className='flex flex-row w-48 justify-center'>
                <p className='px-2 text-5xl'>{speed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='text-3xl flex flex-row w-full p-10 justify-center'>
          <div>
            {calculatedDistances.map((value, index) => {
              if (index < 9)
                return (
                  <div className='flex flex-row w-80 mx-2 bg-second rounded-lg my-1' key={index}>
                    <p className='px-2 py-1 w-48'>{distances[index].label}</p>
                    <p className='px-2 py-1 w-36'>{format(value)}</p>
                  </div>
                );
            })}
          </div>
          <div>
            {calculatedDistances.map((value, index) => {
              if (index >= 9)
                return (
                  <div className='flex flex-row w-80 mx-2 bg-second rounded-lg my-1' key={index}>
                    <p className='px-2 py-1 w-48'>{distances[index].label}</p>
                    <p className='px-2 py-1 w-36'>{format(value)}</p>
                  </div>
                );
            })}
          </div>
        </div>
        <div>
          <button onClick={() => reset()} className='bg-second p-2 rounded-lg text-2xl hover:bg-main mb-2'>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
