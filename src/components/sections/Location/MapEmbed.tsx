// src/components/sections/Location/MapEmbed.tsx
import React from 'react';

interface MapEmbedProps {
  mapEmbedUrl: string;
  title?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  mapEmbedUrl,
  title = "Ubicación de la Feria"
}) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl"> {/* Controla la proporción */}
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%" // Se ajustará por el aspect ratio del div padre
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};

export default MapEmbed;