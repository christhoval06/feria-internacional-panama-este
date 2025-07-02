import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import React from 'react';

// REEMPLAZA CON TU INFORMACIÓN REAL
const CONTACT_EMAIL = 'info@feriapanamaeste.com';
const CONTACT_PHONE = '+507 123-4567';
// const OFFICE_ADDRESS_KEY = "contact.officeAddress"; // Clave de traducción
// const OFFICE_ADDRESS_DEFAULT = "Oficinas Centrales de la Feria, Edificio Innovación, Piso 2, Panamá Este (Solo con cita previa)";

const socialLinks = [
  { icon: <FaFacebook />, href: 'https://facebook.com/feriapanamaeste', label: 'Facebook' },
  { icon: <FaInstagram />, href: 'https://instagram.com/feriapanamaeste', label: 'Instagram' },
  { icon: <FaTwitter />, href: 'https://twitter.com/feriapanamaeste', label: 'Twitter' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/company/feriapanamaeste', label: 'LinkedIn' },
];

const ContactChannels = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: <FaEnvelope className="text-fair-secondary" />,
      label: t('contact.channels.email', 'Correo Electrónico:'),
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: <FaPhone className="text-fair-secondary" />,
      label: t('contact.channels.phone', 'Teléfono:'),
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE.replace(/\s|-/g, '')}`,
    },
    // { icon: <FaMapMarkerAlt className="text-fair-secondary" />, label: t('contact.channels.office', 'Oficina (con cita):'), value: t(OFFICE_ADDRESS_KEY, OFFICE_ADDRESS_DEFAULT) }, // Descomentar si tienes dirección de oficina
  ];

  return (
    <motion.div
      className="space-y-6 rounded-lg bg-white p-6 shadow-xl md:p-8" // h-full para intentar igualar altura con el form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="bg-fair-secondary/10 mt-1 mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
            {React.cloneElement(item.icon, { size: 18 })}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500">{item.label}</h4>
            {item.href ? (
              <a href={item.href} className="text-md text-fair-primary break-all hover:underline">
                {item.value}
              </a>
            ) : (
              <p className="text-md break-all text-gray-700">{item.value}</p>
            )}
          </div>
        </div>
      ))}

      {/* Redes Sociales */}
      {socialLinks.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="mb-3 text-center text-sm font-semibold text-gray-500 md:text-left">
            {t('contact.channels.socialMedia', 'Síguenos en Redes Sociales')}
          </h4>
          <div className="flex justify-center space-x-4 md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="hover:text-fair-secondary text-gray-500 transition-colors"
              >
                {React.cloneElement(social.icon, { size: 24 })}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactChannels;
