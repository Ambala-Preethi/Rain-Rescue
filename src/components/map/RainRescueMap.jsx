import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Filter, Eye, AlertCircle, Droplet, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const RainRescueMap = ({ height = '600px', initialCenter = [17.4200, 78.4350], zoom = 12 }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const { reports, tankers, rechargePits, collectionRequests } = useData();

  // Filters
  const [filterType, setFilterType] = useState('all'); // all, reports, tankers, pits, requests
  const [selectedLocality, setSelectedLocality] = useState('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map centered on Hyderabad
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: zoom,
        zoomControl: true
      });

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers whenever data or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    // 1. Waterlogging Reports (RED)
    if (filterType === 'all' || filterType === 'reports') {
      reports.forEach((rep) => {
        if (!rep.lat || !rep.lng) return;
        if (selectedLocality !== 'all' && rep.locality !== selectedLocality) return;

        const redIcon = L.divIcon({
          className: 'custom-pin-red',
          html: `<div style="background-color: #ef4444; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(239,68,68,0.5); font-weight: bold; font-size: 14px;">💧</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 220px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: #fee2e2; color: #dc2626; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">WATERLOGGING</span>
              <span style="font-size: 11px; color: #64748b;">${rep.id}</span>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">${rep.area}</div>
            <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
              <strong>Volume:</strong> ${(rep.waterVolumeLitres || 0).toLocaleString()} Litres<br/>
              <strong>Water Depth:</strong> ${rep.waterDepthFeet || 1.5} ft<br/>
              <strong>Severity:</strong> <span style="color: #dc2626; font-weight: 600;">${rep.severity}</span><br/>
              <strong>Status:</strong> ${rep.status.replace(/_/g, ' ')}
            </div>
            ${rep.photoUrl ? `<img src="${rep.photoUrl}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-top: 4px;" alt="Waterlogging photo"/>` : ''}
          </div>
        `;

        const marker = L.marker([rep.lat, rep.lng], { icon: redIcon }).bindPopup(popupContent);
        layer.addLayer(marker);
      });
    }

    // 2. Available Water Tankers (BLUE)
    if (filterType === 'all' || filterType === 'tankers') {
      tankers.forEach((t) => {
        if (!t.lat || !t.lng) return;

        const blueIcon = L.divIcon({
          className: 'custom-pin-blue',
          html: `<div style="background-color: #0284c7; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(2,132,199,0.5); font-weight: bold; font-size: 14px;">🚚</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 220px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">WATER TANKER</span>
              <span style="font-size: 11px; color: ${t.availability === 'available' ? '#16a34a' : '#ea580c'}; font-weight: 700;">${t.availability.toUpperCase()}</span>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">${t.registrationNumber}</div>
            <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
              <strong>Operator:</strong> ${t.operatorName}<br/>
              <strong>Capacity:</strong> ${(t.capacityLitres || 0).toLocaleString()} Litres<br/>
              <strong>Current Station:</strong> ${t.currentLocationName}<br/>
              <strong>Total Recovered:</strong> ${(t.totalWaterRecoveredLitres || 0).toLocaleString()} L
            </div>
          </div>
        `;

        const marker = L.marker([t.lat, t.lng], { icon: blueIcon }).bindPopup(popupContent);
        layer.addLayer(marker);
      });
    }

    // 3. Approved Recharge Pits (GREEN)
    if (filterType === 'all' || filterType === 'pits') {
      rechargePits.forEach((pit) => {
        if (!pit.lat || !pit.lng) return;

        const greenIcon = L.divIcon({
          className: 'custom-pin-green',
          html: `<div style="background-color: #16a34a; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(22,163,74,0.5); font-weight: bold; font-size: 14px;">🌱</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 230px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">APPROVED RECHARGE PIT</span>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 2px;">${pit.name}</div>
            <div style="font-size: 12px; color: #047857; font-weight: 600; margin-bottom: 4px;">${pit.teluguName || 'Recharge Facility'}</div>
            <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
              <strong>Daily Capacity:</strong> ${(pit.dailyCapacityLitres || 0).toLocaleString()} L/day<br/>
              <strong>Water Table Rise:</strong> +${pit.waterTableRiseRecordedCm || 0} cm<br/>
              <strong>Soil Type:</strong> ${pit.soilType}<br/>
              <strong>Filtration:</strong> ${pit.filterSystem}
            </div>
          </div>
        `;

        const marker = L.marker([pit.lat, pit.lng], { icon: greenIcon }).bindPopup(popupContent);
        layer.addLayer(marker);
      });
    }

    // 4. Pending / Active Collection Requests (ORANGE)
    if (filterType === 'all' || filterType === 'requests') {
      collectionRequests
        .filter(r => r.status !== 'delivered' && r.status !== 'rejected_contaminated')
        .forEach((req) => {
          const rep = reports.find(r => r.id === req.reportId);
          if (!rep || !rep.lat || !rep.lng) return;

          const orangeIcon = L.divIcon({
            className: 'custom-pin-orange',
            html: `<div style="background-color: #f97316; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 3px solid white; box-shadow: 0 4px 10px rgba(249,115,22,0.5); font-weight: bold; font-size: 14px;">⚡</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
          });

          const popupContent = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 220px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                <span style="background: #ffedd5; color: #c2410c; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">ACTIVE MISSION</span>
                <span style="font-size: 11px; color: #64748b;">${req.id}</span>
              </div>
              <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">${rep.area}</div>
              <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
                <strong>Status:</strong> ${req.status.replace(/_/g, ' ')}<br/>
                <strong>Assigned Tanker:</strong> ${req.tankerId}<br/>
                <strong>Target Pit:</strong> ${req.rechargePitId}
              </div>
            </div>
          `;

          const marker = L.marker([rep.lat + 0.0015, rep.lng + 0.0015], { icon: orangeIcon }).bindPopup(popupContent);
          layer.addLayer(marker);
        });
    }

  }, [reports, tankers, rechargePits, collectionRequests, filterType, selectedLocality]);

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
      {/* Map Control Overlay */}
      <div style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        zIndex: 500,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '10px 14px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '0.825rem'
      }}>
        <div style={{ fontWeight: 700, color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} /> Map Layers & Filter
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: filterType === 'all' ? 'var(--primary-600)' : 'white',
              color: filterType === 'all' ? 'white' : 'var(--slate-700)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          >
            All Markers
          </button>
          <button
            onClick={() => setFilterType('reports')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: filterType === 'reports' ? '#ef4444' : 'white',
              color: filterType === 'reports' ? 'white' : 'var(--slate-700)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          >
            🔴 Floods ({reports.length})
          </button>
          <button
            onClick={() => setFilterType('tankers')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: filterType === 'tankers' ? '#0284c7' : 'white',
              color: filterType === 'tankers' ? 'white' : 'var(--slate-700)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          >
            🔵 Tankers ({tankers.length})
          </button>
          <button
            onClick={() => setFilterType('pits')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: filterType === 'pits' ? '#16a34a' : 'white',
              color: filterType === 'pits' ? 'white' : 'var(--slate-700)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          >
            🟢 Pits ({rechargePits.length})
          </button>
          <button
            onClick={() => setFilterType('requests')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: filterType === 'requests' ? '#f97316' : 'white',
              color: filterType === 'requests' ? 'white' : 'var(--slate-700)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          >
            🟠 Active Missions
          </button>
        </div>
      </div>

      {/* Legend Badge Bar */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '14px',
        zIndex: 500,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '6px 12px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.75rem',
        color: 'var(--slate-700)'
      }}>
        <span><strong style={{ color: '#ef4444' }}>🔴 Red:</strong> Waterlogging</span>
        <span><strong style={{ color: '#0284c7' }}>🔵 Blue:</strong> Tankers</span>
        <span><strong style={{ color: '#16a34a' }}>🟢 Green:</strong> Recharge Pits</span>
        <span><strong style={{ color: '#f97316' }}>🟠 Orange:</strong> In-Progress Pickup</span>
      </div>

      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

