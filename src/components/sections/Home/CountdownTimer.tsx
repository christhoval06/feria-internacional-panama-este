import { useState, useEffect, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface Props {
    date: Date;
}

const CountdownTimer = ({date}: Props) => {
  const { t } = useTranslation();

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +date - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }); // No dependencies array to run every second, or add timeLeft to re-run when it changes.

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof TimeLeft] && timeLeft[interval as keyof TimeLeft] !==0) { // Omit if undefined (event passed)
      return;
    }

    timerComponents.push(
      <motion.div
        key={interval}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-2 md:p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-md min-w-[70px] md:min-w-[90px]"
      >
        <span className="text-2xl md:text-6xl font-bold text-fair-secondary">
          {String(timeLeft[interval as keyof TimeLeft]).padStart(2, '0')}
        </span>
        <span className="block text-xs md:text-sm uppercase text-white/80">
          {t(`home.${interval}`)} {/* e.g., home.days */}
        </span>
      </motion.div>
    );
  });

  return (
    <div className="py-10 md:py-12 bg-fair-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8"
        >
          {t('home.countdownTitle')}
        </motion.h2>
        {timerComponents.length ? (
          <div className="flex justify-center items-center space-x-2 md:space-x-4">
            {timerComponents}
          </div>
        ) : (
          <p className="text-xl md:text-2xl">{t('home.eventStarted', '¡La feria ha comenzado!')}</p> // Add 'home.eventStarted' to translations
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;