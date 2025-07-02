import { useEffect, useRef, useState, useCallback } from "react";

const addLeadingZeros = (value: number): string => {
  let _value = String(value);
  while (_value.length < 2) {
    _value = "0" + value;
  }
  return _value;
};

interface Props {
    date: string;
}

function Countdown({ date }: Props) {
  const interval = useRef<number>(undefined);
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  const calculateCountdown = useCallback((endDate: string) => {
    const now = Date.now();
    let diff = (Date.parse(endDate) - now) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = Math.round(diff);

    return timeLeft;
  }, []);

  const stop = useCallback(() => {
    clearInterval(interval.current);
  }, []);

  useEffect(() => {
    interval.current = setInterval(() => {
      const _date = calculateCountdown(date);
      _date ? setState(_date) : stop();
    }, 1000);
  }, [stop, date, calculateCountdown]);

  const ITEMS = [
    {
      value: state.days,
      label: `Day${state.days === 1 ? "" : "s"}`
    },
    {
      value: state.hours,
      label: `Hour${state.hours === 1 ? "" : "s"}`
    },
    {
      value: state.min,
      label: `Min${state.min === 1 ? "" : "s"}`
    },
    {
      value: state.sec,
      label: `Sec${state.sec === 1 ? "" : "s"}`
    }
  ]

  return (
    <div className="mx-auto my-2 text-white">
      {ITEMS.map(({value, label}) =>  (
        <span key={label} className="inline-block">
        <span className="flex flex-col items-center my-auto mx-5">
          <strong className="md:text-6xl text-xl">{addLeadingZeros(value)}</strong>
          <span>{label}</span>
        </span>
      </span>
      ))}
    </div>
  );
}

export default Countdown;