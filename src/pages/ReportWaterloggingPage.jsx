import React, { useState } from 'react';
import { 
  Droplet, 
  MapPin, 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { LocationPickerMap } from '../components/map/LocationPickerMap';

const SAMPLE_FLOOD_PHOTOS = [
  {
    label: "Roadway Flood (Tolichowki / Mehdipatnam)",
    url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Subway Inundation (Begumpet)",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Commercial Pavement Runoff (Madhapur)",
    url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Colony Ground Puddle (Amberpet)",
    url: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=600&q=80"
  }
];

export const ReportWaterloggingPage = ({ setActivePage }) => {
  const { currentUser } = useAuth();
  const { addReport } = useData();

  const [area, setArea] = useState('');
  const [locality, setLocality] = useState('Banjara Hills');
  const [coordinates, setCoordinates] = useState({ lat: 17.4156, lng: 78.4354 });
  const [waterVolumeLitres, setWaterVolumeLitres] = useState(15000);
  const [waterDepthFeet, setWaterDepthFeet] = useState(2.0);
  const [severity, setSeverity] = useState('Moderate');
  const [waterSource, setWaterSource] = useState('Urban Road Runoff');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_FLOOD_PHOTOS[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!area) return;

    setIsSubmitting(true);

    const report = addReport({
      area,
      locality,
      lat: coordinates.lat,
      lng: coordinates.lng,
      reportedBy: currentUser?.name || 'Citizen Reporter',
      citizenPhone: currentUser?.phone || '+91 98480 11223',
      waterVolumeLitres: Number(waterVolumeLitres),
      waterDepthFeet: Number(waterDepthFeet),
      severity,
      waterSource,
      description,
      photoUrl
    });

    setIsSubmitting(false);
    setSubmittedReport(report);
  };

  if (submittedReport) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '650px', margin: '2rem auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--secondary-100)',
            color: 'var(--secondary-700)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Report Submitted Successfully!
          </h2>
          <div style={{ color: 'var(--slate-500)', marginTop: '4px', fontSize: '0.95rem' }}>
            Report Reference: <strong>{submittedReport.id}</strong>
          </div>

          <div style={{
            background: 'var(--slate-50)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            margin: '1.5rem 0',
            textAlign: 'left'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div><strong>Location:</strong> {submittedReport.area}</div>
              <div><strong>Locality:</strong> {submittedReport.locality}</div>
              <div><strong>Est. Volume:</strong> {submittedReport.waterVolumeLitres.toLocaleString()} L</div>
              <div><strong>Depth:</strong> {submittedReport.waterDepthFeet} ft</div>
              <div><strong>Coordinates:</strong> {submittedReport.lat}, {submittedReport.lng}</div>
              <div><strong>Current Status:</strong> Pending Verification</div>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            GHMC municipal desk will verify the location for stormwater safety. Once cleared, an on-duty water tanker will be dispatched to pump the water and transfer it to an approved recharge facility.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              className="btn btn-outline"
              onClick={() => setActivePage('citizen-dashboard')}
            >
              Back to My Dashboard
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setActivePage('map')}
            >
              <MapPin size={16} /> View on Live Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => setActivePage('citizen-dashboard')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="card">
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="card-title" style={{ fontSize: '1.4rem' }}>
              <Droplet size={24} color="var(--primary-600)" />
              Report Excess Rainwater / Waterlogging
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Identify standing stormwater in Hyderabad for recovery and groundwater replenishment
            </div>
          </div>
          <span className="badge badge-warning">Step 1 of 10</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Spot Name & Locality */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Specific Waterlogged Spot / Landmark *</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g., Road No. 12 underbridge near police post"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hyderabad Locality / Ward *</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="form-select"
              >
                <option value="Banjara Hills">Banjara Hills</option>
                <option value="Jubilee Hills">Jubilee Hills</option>
                <option value="Tolichowki">Tolichowki / Shaikpet</option>
                <option value="Begumpet">Begumpet / Prakash Nagar</option>
                <option value="Madhapur">Madhapur / Hitec City</option>
                <option value="Gachibowli">Gachibowli / Financial Dist</option>
                <option value="Kukatpally">Kukatpally / KPHB</option>
                <option value="Amberpet">Amberpet / Ramanthapur</option>
                <option value="Malakpet">Malakpet / Dilsukhnagar</option>
                <option value="Charminar">Charminar / Old City</option>
                <option value="Secunderabad">Secunderabad / Marredpally</option>
              </select>
            </div>
          </div>

          {/* Section 2: Interactive Map Location Pinpoint */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Pinpoint Exact Location on Interactive Map *</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                Lat: {coordinates.lat}, Lng: {coordinates.lng}
              </span>
            </label>
            <LocationPickerMap
              value={coordinates}
              onChange={(newCoord) => setCoordinates(newCoord)}
              height="260px"
            />
          </div>

          {/* Section 3: Water Volume & Depth Estimation */}
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">
                Est. Excess Water Volume: <strong>{Number(waterVolumeLitres).toLocaleString()} L</strong>
              </label>
              <input
                type="range"
                min="3000"
                max="60000"
                step="1000"
                value={waterVolumeLitres}
                onChange={(e) => setWaterVolumeLitres(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-600)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                <span>3,000 L (Small pool)</span>
                <span>20k L (Tanker load)</span>
                <span>60k L (Subway flood)</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Water Depth (approx. feet)</label>
              <select
                value={waterDepthFeet}
                onChange={(e) => setWaterDepthFeet(e.target.value)}
                className="form-select"
              >
                <option value="1.0">1.0 ft (Ankle deep)</option>
                <option value="1.5">1.5 ft (Mid-calf)</option>
                <option value="2.0">2.0 ft (Knee deep)</option>
                <option value="2.5">2.5 ft (Vehicle wheel height)</option>
                <option value="3.5">3.5+ ft (Severe subway/underpass flooding)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="form-select"
              >
                <option value="Low">Low – Pedestrian inconvenience</option>
                <option value="Moderate">Moderate – Slow traffic</option>
                <option value="High">High – Lane blockage</option>
                <option value="Severe">Severe – Complete submergence</option>
              </select>
            </div>
          </div>

          {/* Section 4: Water Source & Description */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Water Source Type</label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                className="form-select"
              >
                <option value="Urban Road Runoff">Urban Road / Flyover Runoff</option>
                <option value="Paved Commercial Apron">Commercial Apron / Plaza</option>
                <option value="Residential Open Ground">Residential Colony Open Ground</option>
                <option value="Underpass Storm Drainage">Underpass / Subway Storm Drainage</option>
                <option value="Park Basin Overflow">Public Park Basin Overflow</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Visual Observation / Water Quality Notes</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Clear rain runoff, free from drainage sewage or industrial smell"
                className="form-control"
              />
            </div>
          </div>

          {/* Section 5: Photo Upload / Demo Selection */}
          <div className="form-group">
            <label className="form-label">Upload / Select Inundation Photograph *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              {SAMPLE_FLOOD_PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setPhotoUrl(photo.url)}
                  style={{
                    border: `2px solid ${photoUrl === photo.url ? 'var(--primary-600)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.label}
                    style={{ width: '100%', height: '90px', objectFit: 'cover' }}
                  />
                  <div style={{
                    padding: '4px 6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: photoUrl === photo.url ? 'var(--primary-600)' : 'rgba(0,0,0,0.6)',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    {photo.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-100)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            fontSize: '0.825rem',
            color: 'var(--primary-900)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1.5rem'
          }}>
            <Info size={18} style={{ flexShrink: 0 }} />
            <span>
              By submitting this report, you alert municipal authorities and nearby tanker operators to inspect and mobilize. Thank you for protecting Hyderabad from urban flooding!
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setActivePage('citizen-dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ fontWeight: 700 }}
            >
              <Upload size={16} /> Submit Waterlogging Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

