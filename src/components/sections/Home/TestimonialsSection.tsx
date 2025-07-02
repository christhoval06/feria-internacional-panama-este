import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Slider from 'react-slick'; // Asumiendo que ya tienes react-slick para ActivityCarousel
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

interface Testimonial {
  id: string;
  quoteKey: string;
  authorKey: string;
  imageUrl?: string; // Opcional: foto del autor
}

// DATOS DE EJEMPLO - REEMPLAZA CON LOS REALES
const testimonialsData: Testimonial[] = [
  { id: 't1', quoteKey: 'home.testimonial1_quote', authorKey: 'home.testimonial1_author', imageUrl: 'https://placehold.co/80/006400/FFFFFF?Text=Author1' },
  { id: 't2', quoteKey: 'home.testimonial2_quote', authorKey: 'home.testimonial2_author', imageUrl: 'https://placehold.co/80/DAA520/000000?Text=Author2' },
  // Agrega más testimonios
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: testimonialsData.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false, // Puedes añadir flechas personalizadas si quieres
    appendDots: (dots: any) => (
      <div className="mt-4">
        <ul className="!m-0 p-0 flex justify-center"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 mx-1 bg-fair-accent/30 rounded-full transition-all duration-300 ease-in-out group-[.slick-active]:bg-fair-accent group-[.slick-active]:w-4"></div>
    )
  };

  if (testimonialsData.length === 0) return null; // No renderizar si no hay testimonios

  return (
    <section className="py-12 md:py-16 bg-fair-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-fair-primary mb-10 md:mb-12"
        >
          {t('home.testimonialsTitle')}
        </motion.h2>

        <Slider {...sliderSettings}>
          {testimonialsData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="px-4" // Padding para el slide
            >
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt={t(testimonial.authorKey)}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-fair-secondary"
                  />
                )}
                <FaQuoteLeft className="text-2xl text-fair-secondary/50 mb-4 inline-block" />
                <p className="text-lg md:text-xl italic text-gray-700 mb-4 leading-relaxed">
                  {t(testimonial.quoteKey)}
                </p>
                <FaQuoteRight className="text-2xl text-fair-secondary/50 mt-2 mb-4 inline-block" />
                <p className="font-semibold text-fair-primary">{t(testimonial.authorKey)}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;