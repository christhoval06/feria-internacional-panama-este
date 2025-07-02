import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

import Parallax from '../../common/Parallax';
import { goToElement } from '../../../utils/scroll';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <Parallax
        image="before:bg-agro"
        color="after:bg-fair-primary"
        className="h-[50vh] md:h-[80vh] container mx-auto px-4 flex items-center justify-center"
        extra={
          <>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(218,165,32)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center absolute bg-fair-secondary text-white rounded-full  -mt-5 left-1/2 z-[5] size-16"
              onClick={() => goToElement('activities')}>
              <FaArrowDown className="size-8" />
            </motion.button>
          </>
        }>

        <motion.div
          className="relative z-10" // Asegura que el contenido esté sobre el overlay
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-fair-primary mb-4">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-fair-dark mb-6 max-w-2xl mx-auto">
            {t('home.welcomeMessage', { fairName: t('fairName') })}
          </p>
          <p className="text-md md:text-lg text-fair-accent font-semibold mb-8">
            {t('fairSlogan')}
          </p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-2xl font-bold text-fair-secondary mb-8"
          >
            {t('home.date')}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(218,165,32)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-fair-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            {t('home.ctaButton', '¡Regístrate Ahora!')} {/* Añade 'home.ctaButton' a tus JSON */}
          </motion.button>

        </motion.div>
      </Parallax>
      <div className="sr-only">
        <Parallax
          image="before:bg-agro"
          color="after:bg-fair-primary"
          className="h-[50vh] md:h-[80vh] container mx-auto px-4 flex items-center justify-center sr-only0-=[
      "
          extra={
            <>
              <motion.button className="md:block absolute bg-fair-secondary py-2 px-4 text-white rounded-full text-xl -mt-5 left-1/2 z-[5]">
                +
              </motion.button>
            </>
          }>
          <div className="flex items-center font-[sans-serif] text-white max-w-5xl max-md:max-w-md mx-auto">
            <div className="max-md:text-center p-2">
              <div className="text-center">
                <h3 className="md:text-xl text-lg">DICIEMBRE 2023</h3>
                <h1 className="p-0 lg:text-9xl md:text-7xl text-3xl md:leading-12 lg:leading-12">
                  <div>BACKYARD</div>
                  <div>RUGBY</div>
                </h1>
                <h2 className="py-1 bg-red-500 px-3 md:text-base text-sm">
                  SERIES
                </h2>
              </div>
            </div>
          </div>
          <div className="container sr-only">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-16 gap-2 items-center">
              <img
                src="./images/rugby_PNG77.png"
                className="w-full h-full shrink-0"
              />
              <div className="lg:col-span-2 py-10 px-6 text-center">
                <div className=" text-white font-bold flex justify-center">
                  <div>
                    <h4>ENERO 2024</h4>
                    <h1 className="p-0">
                      <div>BACKYARD</div>
                      <div>RUGBY</div>
                    </h1>
                    <h2 className="py-3 bg-red-500 px-3">SERIES</h2>
                  </div>
                  <p className="mt-2 text-sm text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <button
                  type="button"
                  className="px-6 py-3 mt-8 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-500 hover:bg-blue-700 active:bg-blue-600"
                >
                  Inscribirse
                </button>
              </div>
            </div>
          </div>
        </Parallax>
        <section
          className="relative py-20 px-4 text-center bg-cover bg-center shadow-xl bg-agro sr-only">
          {/* Overlay opcional si la imagen de fondo dificulta la lectura */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <motion.div
            className="relative z-10" // Asegura que el contenido esté sobre el overlay
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-fair-primary mb-4">
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-fair-dark mb-6 max-w-2xl mx-auto">
              {t('home.welcomeMessage', { fairName: t('fairName') })}
            </p>
            <p className="text-md md:text-lg text-fair-accent font-semibold mb-8">
              {t('fairSlogan')}
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-2xl font-bold text-fair-secondary mb-8"
            >
              {t('home.date')}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(218,165,32)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-fair-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              {t('home.ctaButton', '¡Regístrate Ahora!')} {/* Añade 'home.ctaButton' a tus JSON */}
            </motion.button>
          </motion.div>
        </section>
      </div>
    </>
  );
};
export default HeroSection;