// src/components/sections/Contact/ContactForm.tsx
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject?: string; // Opcional
  message: string;
}

// REEMPLAZA ESTO con tu endpoint de Formspree o la URL de tu backend
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // Ejemplo Formspree

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<string>(''); // 'success', 'error', o ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // Simulación de envío para Formspree (o tu backend)
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar formulario
      } else {
        // Intenta parsear el error del backend si es posible
        // const errorData = await response.json();
        // console.error("Error response:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('error');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.name', 'Nombre Completo')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fair-secondary focus:border-fair-secondary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.email', 'Correo Electrónico')} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fair-secondary focus:border-fair-secondary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.subject', 'Asunto')}
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fair-secondary focus:border-fair-secondary sm:text-sm"
        />
        {/* Alternativa: un <select> para el asunto
        <select name="subject" id="subject" value={formData.subject} onChange={handleChange} className="...">
            <option value="">{t('contact.form.selectSubject', 'Selecciona un tema...')}</option>
            <option value="general">{t('contact.form.subjectGeneral', 'Consulta General')}</option>
            <option value="exhibitor">{t('contact.form.subjectExhibitor', 'Información para Expositores')}</option>
            // ... más opciones
        </select> */}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.message', 'Mensaje')} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fair-secondary focus:border-fair-secondary sm:text-sm"
        />
      </div>
      <div>
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fair-primary hover:bg-fair-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fair-secondary disabled:opacity-50"
        >
          {status === 'sending' ? t('contact.form.sending', 'Enviando...') : t('contact.form.send', 'Enviar Mensaje')}
        </motion.button>
      </div>
      {status === 'success' && (
        <p className="mt-3 text-sm text-center text-green-600 bg-green-50 p-3 rounded-md">
          {t('contact.form.success', '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.')}
        </p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">
          {t('contact.form.error', 'Oops. Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o usa otro canal de contacto.')}
        </p>
      )}
    </motion.form>
  );
};

export default ContactForm;