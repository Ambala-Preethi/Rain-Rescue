import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export const LocationPickerMap = ({ value = { lat: 17.4045, lng: 78.4121 }, onChange, height = '300px' }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [value.lat || 17.4045, value.lng || 78.4121],
        zoom: 13,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add draggable pin
      const redPin = L.divIcon({
        className: 'custom-pin-picker',
        html: `<div style="background-color: #ef4444; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4); font-size: 16px;">📍</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      const marker = L.marker([value.lat || 17.4045, value.lng || 78.4121], {
        icon: redPin,
        draggable: true
      }).addTo(map);

      marker.on('dragend', function (e) {
        const pos = e.target.getLatLng();
        if (onChange) {
          onChange({ lat: Number(pos.lat.toFixed(5)), lng: Number(pos.lng.toFixed(5)) });
        }
      });

      map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        if (onChange) {
          onChange({ lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) });
        }
      });

      markerRef.current = marker;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        zIndex: 500,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 600,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        Click anywhere on map to pin exact flood spot
      </div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

