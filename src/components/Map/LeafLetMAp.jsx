import React, { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Leaflet.css';

const LeafLetMAp = ({ position }) => {
  const center = useMemo(() => [49.82413, 23.982449], []);

  const markerRef = useRef(null);
  const customMarkerIcon = L.icon({
    iconUrl: '../../../check.svg',
    iconSize: [42, 42], // Размер вашей иконки маркера
    iconAnchor: [16, 32], // Размер якоря иконки маркера
  });

  const handleMarkerClick = () => {
    const [lat, lng] = center;

    const isMobileAndroid =
      /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobileIos = /ios|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobileAndroid) {
      const url = `google.navigation:q=${lat},${lng}`;
      window.location.href = url;
    }
    if (isMobileIos) {
      window.open(`http://maps.apple.com/?daddr=${lat},${lng}`);
    }
    if (!isMobileAndroid && !isMobileIos) {
      // Открытие Google Карт в новой вкладке и построение маршрута
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url);
    }
  };

  useEffect(() => {
    const marker = markerRef.current;
    if (marker != null) {
      marker.on('add', () => {
        // Добавляем класс анимации после добавления маркера на карту
        marker.getElement().classList.add('marker-bounce');
      });

      marker.on('remove', () => {
        // Удаляем класс анимации перед удалением маркера с карты
        marker.getElement().classList.remove('marker-bounce');
      });
    }
  }, []);
  return (
    <MapContainer
      // style={{ height: '80vh', width: '100%' }}
      center={center}
      zoom={16}
      scrollWheelZoom={false}
    >
      <Marker
        ref={markerRef}
        icon={customMarkerIcon}
        title={`Rapid Servise \n Зоряна 29`}
        position={center}
        eventHandlers={{ click: handleMarkerClick }}
      >
        <Popup className=" text-center">
          Rapid Servise <br /> Зоряна 29
        </Popup>
      </Marker>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default LeafLetMAp;
