import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
// Importa logos de patrocinadores o usa placeholders
// import sponsorLogo1 from '../../../assets/images/sponsors/sponsor1.png';
// import sponsorLogo2 from '../../../assets/images/sponsors/sponsor2.png';

interface Sponsor {
    id: string;
    name: string;
    logoUrl: string; // URL o ruta al logo
    websiteUrl?: string; // Opcional: enlace al sitio del patrocinador
}

// DATOS DE EJEMPLO - REEMPLAZA CON LOS REALES
const sponsorsData: Sponsor[] = [
    { id: 'sponsor1', name: 'Agro Soluciones Panamá', logoUrl: 'https://placehold.co/160x70/6B7280/FFFFFF?Text=AgroSol', websiteUrl: '#' },
    { id: 'sponsor2', name: 'Ganadería Unida S.A.', logoUrl: 'https://placehold.co/140x60/6B7280/FFFFFF?Text=GanaderíaUnida', websiteUrl: '#' },
    { id: 'sponsor3', name: 'Banco del Istmo', logoUrl: 'https://placehold.co/170x65/6B7280/FFFFFF?Text=BancoIstmo', websiteUrl: '#' },
    { id: 'sponsor4', name: 'Innovatech Emprende', logoUrl: 'https://placehold.co/150x75/6B7280/FFFFFF?Text=Innovatech', websiteUrl: '#' },
    { id: 'sponsor5', name: 'Logística del Este', logoUrl: 'https://placehold.co/180x60/6B7280/FFFFFF?Text=LogísticaEste', websiteUrl: '#' },
    { id: 'sponsor6', name: 'Fértiles Tierras Corp.', logoUrl: 'https://placehold.co/130x70/6B7280/FFFFFF?Text=FértilesTierras', websiteUrl: '#' },
    { id: 'sponsor7', name: 'Asociación de Productores de Chepo', logoUrl: 'https://placehold.co/190x55/6B7280/FFFFFF?Text=APROCHE', websiteUrl: '#' },
    { id: 'sponsor8', name: 'Cámara de Comercio de Panamá Este', logoUrl: 'https://placehold.co/200x70/6B7280/FFFFFF?Text=CAMCOPE', websiteUrl: '#' },
    { id: 'sponsor9', name: 'Energías Renovables Pacora', logoUrl: 'https://placehold.co/155x65/6B7280/FFFFFF?Text=ERPacora', websiteUrl: '#' },
    { id: 'sponsor10', name: 'Universidad Tecnológica Agropecuaria', logoUrl: 'https://placehold.co/165x70/6B7280/FFFFFF?Text=UTA', websiteUrl: '#' },
];

// const logoVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//         opacity: 1,
//         y: 0,
//         transition: { delay: i * 0.1, duration: 0.3 },
//     }),
// };

// const SponsorsSection = () => {
//   const { t } = useTranslation();

//   return (
//     <section className="py-12 md:py-16 bg-gray-50"> {/* Un fondo ligeramente diferente */}
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl md:text-4xl font-bold text-center text-fair-primary mb-10 md:mb-12"
//         >
//           {t('home.sponsorsTitle')}
//         </motion.h2>
//         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
//           {sponsorsData.map((sponsor, index) => (
//             <motion.div
//               key={sponsor.id}
//               custom={index}
//               variants={logoVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <a
//                 href={sponsor.websiteUrl || '#'}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title={sponsor.name}
//                 className="block opacity-70 hover:opacity-100 transition-opacity duration-300"
//               >
//                 <img
//                   src={sponsor.logoUrl}
//                   alt={sponsor.name}
//                   className="max-h-12 md:max-h-16 w-auto" // Ajusta el tamaño según tus logos
//                 />
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

const SponsorsSection = () => {
    const { t } = useTranslation();

    // Para que el marquee funcione bien, a menudo se duplican los elementos
    // si no hay suficientes para llenar el ancho y crear un loop visual continuo.
    // react-fast-marquee lo maneja internamente si el contenido es menor al ancho,
    // pero para un efecto más suave, podemos duplicar si son pocos.
    // Sin embargo, con un número decente como 7, ya debería verse bien.

    return (
        <section className="py-12 md:py-16 bg-gray-50 overflow-hidden"> {/* overflow-hidden es importante */}
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-fair-primary mb-10 md:mb-12"
                >
                    {t('home.sponsorsTitle')}
                </motion.h2>
            </div>

            {/* El contenedor del Marquee puede estar fuera del container principal si quieres que ocupe todo el ancho */}
            <div className="w-full">
                <Marquee
                    gradient={true} // Añade un degradado en los bordes para un efecto suave
                    gradientColor={'#f9fafb'} // Color del fondo de la sección (bg-gray-50)
                    gradientWidth={50} // Ancho del degradado
                    speed={40} // Velocidad del marquee
                    pauseOnHover={true} // Pausa la animación al pasar el mouse por encima
                >
                    {sponsorsData.map((sponsor) => (
                        <div key={sponsor.id} className="mx-6 md:mx-10 py-2"> {/* Espacio entre logos */}
                            <a
                                href={sponsor.websiteUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={sponsor.name}
                                className="block opacity-70 hover:opacity-100 transition-opacity duration-300"
                            >
                                <img
                                    src={sponsor.logoUrl}
                                    alt={sponsor.name}
                                    className="max-h-12 md:max-h-16 w-auto" // Ajusta el tamaño según tus logos
                                />
                            </a>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default SponsorsSection;