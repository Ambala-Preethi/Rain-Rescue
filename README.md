# RainRescue – Smart Rainwater Recovery & Groundwater Recharge Platform
### Greater Hyderabad & Telangana Smart Water Alleviation System

> **"Every Drop Counts. Every Drop Matters."**  
> *Turning Urban Floodwater into Tomorrow's Groundwater.*

---

## 1. Project Overview

**RainRescue** is a full-stack-ready, responsive web application engineered for the urban twin-paradox of Hyderabad and Telangana:
1. **Severe Monsoon Urban Flooding & Waterlogging**: Low-lying road corridors, subways, and residential colonies get submerged during intense rainfall spells.
2. **Acute Summer Groundwater Depletion**: Within months after the monsoon, borewells dry up as rainwater was allowed to run off into stormwater drains, leaving citizens reliant on expensive private water tankers.

RainRescue establishes the **missing logistics link**:
Instead of letting storm runoff flood roads and run to waste, the platform connects **Residents**, **Municipal Authorities (GHMC & Ground Water Dept)**, and **Water Tanker Operators** to recover excess stormwater, conduct on-site water quality screening, transport it, and inject it safely into approved rainwater harvesting structures.

---

## 2. Technology Stack

- **Frontend Core**: React 18 with Vite (ESM fast module bundler)
- **Styling & Design System**: Modern CSS3 Custom Properties (Design tokens, soft shadows, rounded corners, responsive grid)
- **Icons**: Lucide React (`lucide-react`)
- **Interactive Geospatial Maps**: Leaflet (`leaflet`) with OpenStreetMap tiles
- **Analytics & Charts**: Recharts (`recharts`)
- **Data Persistence**: LocalStorage with automatic initialization, reactivity, and demo reset
- **Backend-Ready Architecture**: Decoupled state management through Context API (`AuthContext`, `DataContext`, `NotificationContext`) ready for direct Supabase / Firebase integration.

---

## 3. User Roles & Key Features

### 👤 A. Resident / Citizen
- Register and login (or quick 1-click demo persona).
- Report excess waterlogging spots with photos, depth (feet), and estimated volume (litres).
- Interactive map pin selection for pinpointing flood locations.
- Real-time tracking of reported inundation clearance.
- Community environmental impact overview and rainwater calculator.

### 🚚 B. Water Tanker Operator
- Operator registration, tanker capacity, and fleet availability toggle (`Available` / `Busy`).
- Browse nearby approved collection requests.
- Accept and navigate to collection spots.
- Multi-stage collection updater:
  - Step 4: Reached collection point
  - Step 5: Water collected (enter pumped quantity)
  - Step 6 & 7: Water quality screening (pH, turbidity, oil sheen, odor)
  - Step 8 & 9: Transport approval and delivery to approved recharge pit
- Historic log of completed recharge deliveries and cumulative litres salvaged.

### 🏛️ C. Municipal Authority (GHMC & Ground Water Dept)
- Admin Command Dashboard with key citywide KPIs.
- Verification and audit queue for citizen waterlogging reports.
- Tanker assignment and dispatch to approved recharge pits.
- Registered fleet management and tanker availability monitoring.
- Approved recharge pit registry with geological soil suitability and percolation rates.
- Interactive Recharts analytics (Daily collection vs recharge, area breakdown, weekly trends).
- One-click CSV report export for municipal record-keeping.

---

## 4. The 10-Step Water Recovery & Aquifer Recharge Lifecycle

```
[1. Citizen Report] ──> [2. Municipal Verification] ──> [3. Suitability Check]
                                                              │
                                                              ▼
[6. Water Collected] <── [5. Operator Accepted] <── [4. Tanker Assigned]
         │
         ▼
[7. Water Quality Screening] ──(Fails)──> [Safe Storm Diversion] (Contamination Rejected)
         │ (Passes)
         ▼
[8. Transport Approved] ──> [9. Delivered to Recharge Pit] ──> [10. Aquifer & Dashboard Updated]
```

### 🛡️ Mandatory Safety & Aquifer Protection Protocol:
- **No Direct Aquifer Injection**: Untreated floodwater is never injected directly into borewells.
- **On-site Screening**: Every batch is screened:
  - pH: Permissible **6.5 – 8.5**
  - Turbidity: **≤ 35 NTU** (sedimentation required for high silt)
  - Hydrocarbon / Oil: **Zero tolerance** (immediate rejection)
  - Odor / Chemical: **Zero sewage or solvent ingress**
- **Approved Recharge Pits Only**: Delivered exclusively to structures verified for local weathered granitic lithology.

---

## 5. Hyderabad Demonstration Data & Locations

The application includes realistic demonstration locations across Hyderabad:
- **Waterlogging Hotspots**: Tolichowki Flyover, Begumpet Subway, Madhapur 100ft Road, Kukatpally Y-Junction, Amberpet Ali Cafe, Gachibowli Bio-Diversity, Malakpet Underbridge.
- **Approved Recharge Facilities**:
  - KBR National Park Eco-Recharge Complex
  - Sanjeevaiah Park Deep Aquifer Trench
  - University of Hyderabad Eco-Catchment Well
  - Amberpet Public Grounds Percolation Shaft
  - JNTU Hyderabad Rainwater Harvesting Pit #3
- **Tanker Fleet**: Verified commercial and municipal water tankers with potable-grade stainless steel tanks.

---

## 6. Project Structure

```
rainrescue/
├── index.html                   # HTML entry point, Leaflet CSS & Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration with chunk splitting
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main page router & app layout container
│   ├── index.css                # Design system & stylesheet
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication & demo personas
│   │   ├── DataContext.jsx      # Core business state, reports, tankers, pits, metrics
│   │   └── NotificationContext.jsx # Alert toasts & notification center
│   ├── data/
│   │   ├── mockData.js          # Hyderabad demonstration dataset
│   │   └── storageKeys.js       # LocalStorage keys
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Brand, quick persona switcher, notifications
│   │   │   ├── Sidebar.jsx      # Collapsible role-aware sidebar
│   │   │   └── Footer.jsx       # Emergency helplines & project info
│   │   ├── common/
│   │   │   ├── DemoBanner.jsx   # Prototype notice & data reset button
│   │   │   ├── MetricCard.jsx   # KPI card with trends & color accents
│   │   │   ├── StatusBadge.jsx  # Color-coded workflow badges
│   │   │   ├── Modal.jsx        # Accessible dialog wrapper
│   │   │   └── NotificationDropdown.jsx # Real-time alerts popover
│   │   ├── map/
│   │   │   ├── RainRescueMap.jsx     # Leaflet map with colored markers & layer filters
│   │   │   └── LocationPickerMap.jsx # Interactive pinpoint picker for reporting
│   │   ├── workflow/
│   │   │   ├── StatusProgressTracker.jsx  # 10-step visual lifecycle progress bar
│   │   │   ├── QualityScreeningModal.jsx  # Water quality testing form & evaluation
│   │   │   └── AssignTankerModal.jsx      # Tanker & recharge pit assignment modal
│   │   └── calculator/
│   │       └── RainwaterCalculator.jsx    # Hydrological recovery & aquifer rise calculator
│   ├── pages/
│   │   ├── HomePage.jsx               # Landing page with hero, stats, how it works
│   │   ├── LoginPage.jsx              # Sign in with 1-click demo logins
│   │   ├── RegisterPage.jsx           # Register as Citizen or Tanker Operator
│   │   ├── CitizenDashboardPage.jsx   # Citizen report list & personal impact
│   │   ├── ReportWaterloggingPage.jsx # Waterlogging submission with map pin & photo
│   │   ├── InteractiveMapPage.jsx     # Full-screen Hyderabad map explorer
│   │   ├── TankerDashboardPage.jsx    # Tanker operator overview & active mission
│   │   ├── CollectionRequestsPage.jsx # Queue of approved waterlogging spots
│   │   ├── DeliveryTrackingPage.jsx   # Multi-stage mission tracking & quality clearance
│   │   ├── AdminDashboardPage.jsx     # GHMC command center & approvals
│   │   ├── ManageTankersPage.jsx      # Tanker fleet registry & verification
│   │   ├── ManageRechargePitsPage.jsx # Recharge pits registry & percolation capacity
│   │   ├── ReportsAnalyticsPage.jsx   # Recharts charts & CSV download
│   │   └── AboutPage.jsx              # Vision, Hyderabad context & aquifer safety
│   └── utils/
│       ├── formatters.js              # Litre & date formatting helpers
│       ├── exportToCsv.js             # CSV generation & browser download
│       └── waterQualityRules.js       # Hydrological safety screening rules
```

---

## 7. How to Run Locally

1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\ambala preethi goud\.gemini\antigravity\scratch\rainrescue"
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000` (or the URL displayed in the terminal).
4. Use the **Quick Persona Switcher** in the top navigation bar to test as **Citizen**, **Tanker Operator**, or **GHMC Admin** with a single click.
5. Click **Reset Demo Data** in the top banner at any time to restore the demonstration dataset.

