import HeroSection from '../components/sections/Home/HeroSection';
import ActivityCarousel from '../components/sections/Activities/ActivityCarousel';
import FairHighlights from '../components/sections/Home/FairHighlights';
import Countdown from '../components/common/Countdown';
import { WithBackground } from '../components/common/Parallax';
import CountdownTimer from '../components/sections/Home/CountdownTimer';
import BenefitsSection from '../components/sections/Home/BenefitsSection';
import SponsorsSection from '../components/sections/Home/SponsorsSection';
import TestimonialsSection from '../components/sections/Home/TestimonialsSection';
import CallToActionSection from '../components/sections/Home/CallToActionSection';

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <section id="countdown" className="bg-red-500 pt-0 pb-12 md:pb-16 lg:pb-20">
        <CountdownTimer date={new Date('2025-08-13T12:00:00')}/>
         <div className="flex justify-center">
            <Countdown date="2025-08-13T12:00:00" />
          </div>
      </section>
      <section id="highlights" className="py-12 md:py-16 lg:py-20"><FairHighlights /></section>
      <WithBackground id="unete" color="bg-fair-secondary" className="py-10 px-4 sr-only">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] text-black max-w-5xl max-md:max-w-md mx-auto">
            <div className="max-md:order-1 max-md:text-center">
              <p className="mt-4 text-sm md:text-lg text-justify">
                <strong>
                  ¿Crees que tienes lo que se necesita para destacar en el
                  rugby?
                </strong>
                <strong>¿Estás listo para el desafío definitivo?</strong>{" "}
                ¡Demuestra tu valía en nuestro emocionante{" "}
                <strong className="text-accent">
                  torneo de rugby uno vs uno
                </strong>
                ! Es hora de poner a prueba tu habilidad, agilidad y destreza
                en el campo de juego. Si crees que eres lo suficientemente
                valiente para enfrentar a los mejores y demostrar que eres el
                campeón indiscutible, ¡entonces no esperes más! Inscríbete
                ahora y prepárate para la batalla en el evento de{" "}
                <strong className="text-fair-accent">rugby Backyard</strong> que
                definirá al verdadero rey del campo. ¿Aceptas el desafío?
              </p>
            </div>
            <div className="md:h-[450px] md:hidden lg:block">
              <img
                src="./images/empresarial-highlight.jpg"
                className="w-full h-full md:object-contain "
              />
            </div>
          </div>
        </div>
      </WithBackground>
      <section id="benefits" className="py-12 md:py-16 lg:py-20"><BenefitsSection /></section>
      <section id="activities" className="py-12 md:py-16 lg:py-20"><ActivityCarousel /></section>
      <section id="testimonials" className="py-12 md:py-16 lg:py-20"><TestimonialsSection /></section>
      <section id="sponsors" className="py-12 md:py-16 lg:py-20"><SponsorsSection /></section>
      <section id="subscribe" className="pt-12 md:pt-16 lg:pt-20 pb-0"><CallToActionSection /></section>
    </div>
  );
};
export default HomePage;