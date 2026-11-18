// ==========================================================================
// RainRescue – Demonstration Data for Hyderabad & Telangana
// Note: All records are realistic demo entries for testing & presentation.
// ==========================================================================

export const INITIAL_REPORTS = [
  {
    id: "REP-HYD-101",
    area: "Tolichowki Flyover Junction",
    locality: "Tolichowki",
    lat: 17.4045,
    lng: 78.4121,
    reportedBy: "Rahul Varma (Citizen)",
    citizenPhone: "+91 98480 23114",
    waterVolumeLitres: 24000,
    waterDepthFeet: 2.2,
    severity: "High",
    reportedAt: "2026-11-15T09:30:00Z",
    status: "approved_for_collection", // pending_verification, approved_for_collection, in_progress, completed, rejected
    photoUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
    description: "Heavy stagnation on main artery road. Runoff from Banjara Hills slopes creating 2.2ft deep pool. Silt content moderate, clear of commercial sewage.",
    waterSource: "Urban Road Runoff",
    verifiedBy: "GHMC Command Desk #4"
  },
  {
    id: "REP-HYD-102",
    area: "Begumpet Airport Subway Road",
    locality: "Begumpet",
    lat: 17.4448,
    lng: 78.4682,
    reportedBy: "Dr. Ananya Rao",
    citizenPhone: "+91 94401 56782",
    waterVolumeLitres: 35000,
    waterDepthFeet: 3.1,
    severity: "Severe",
    reportedAt: "2026-11-16T11:15:00Z",
    status: "in_progress",
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80",
    description: "Subway waterlogged completely blocking traffic towards Secunderabad. Clean rainwater runoff from railway bunds.",
    waterSource: "Storm Runoff & Railway Embankment",
    verifiedBy: "GHMC Command Desk #2"
  },
  {
    id: "REP-HYD-103",
    area: "Madhapur 100ft Road, Ayyappa Society",
    locality: "Madhapur",
    lat: 17.4483,
    lng: 78.3915,
    reportedBy: "Sandeep Kumar",
    citizenPhone: "+91 99890 11234",
    waterVolumeLitres: 18000,
    waterDepthFeet: 1.8,
    severity: "Moderate",
    reportedAt: "2026-11-16T14:40:00Z",
    status: "pending_verification",
    photoUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80",
    description: "Stagnant rainwater pooling in commercial plaza apron. Low silt, ideal for filtration.",
    waterSource: "Paved Commercial Apron",
    verifiedBy: null
  },
  {
    id: "REP-HYD-104",
    area: "Kukatpally Y-Junction towards Balanagar",
    locality: "Kukatpally",
    lat: 17.4947,
    lng: 78.3996,
    reportedBy: "K. Satyanarayana",
    citizenPhone: "+91 97012 34567",
    waterVolumeLitres: 28000,
    waterDepthFeet: 2.5,
    severity: "High",
    reportedAt: "2026-11-14T08:20:00Z",
    status: "completed",
    photoUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80",
    description: "Low-lying road depression inundated. Collected 25,000L successfully and delivered to JNTU recharge aquifer.",
    waterSource: "Highway Storm Runoff",
    verifiedBy: "GHMC Command Desk #1"
  },
  {
    id: "REP-HYD-105",
    area: "Amberpet Ali Cafe Junction",
    locality: "Amberpet",
    lat: 17.3871,
    lng: 78.5173,
    reportedBy: "Farhan Siddiqui",
    citizenPhone: "+91 98850 99887",
    waterVolumeLitres: 14000,
    waterDepthFeet: 1.5,
    severity: "Moderate",
    reportedAt: "2026-11-16T16:00:00Z",
    status: "approved_for_collection",
    photoUrl: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=600&q=80",
    description: "Waterlogging at corner bus shelter. Rainwater from adjacent open colony grounds.",
    waterSource: "Residential Open Ground Runoff",
    verifiedBy: "GHMC Command Desk #4"
  },
  {
    id: "REP-HYD-106",
    area: "Gachibowli Bio-Diversity Junction",
    locality: "Gachibowli",
    lat: 17.4349,
    lng: 78.3752,
    reportedBy: "Pooja Reddy",
    citizenPhone: "+91 96180 44321",
    waterVolumeLitres: 12000,
    waterDepthFeet: 1.2,
    severity: "Low",
    reportedAt: "2026-11-17T08:45:00Z",
    status: "pending_verification",
    photoUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=600&q=80",
    description: "Service road puddle near flyover ramp. Fresh rainwater accumulation.",
    waterSource: "Flyover Runoff Drain",
    verifiedBy: null
  },
  {
    id: "REP-HYD-107",
    area: "Malakpet Railway Underbridge",
    locality: "Malakpet",
    lat: 17.3753,
    lng: 78.4984,
    reportedBy: "Nagesh Rao",
    citizenPhone: "+91 94901 88776",
    waterVolumeLitres: 22000,
    waterDepthFeet: 2.8,
    severity: "Severe",
    reportedAt: "2026-11-13T10:00:00Z",
    status: "completed",
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80",
    description: "Deep underbridge inundation cleared. Silt was filtered and delivered to Amberpet percolation pit.",
    waterSource: "Underpass Storm Drainage",
    verifiedBy: "GHMC Command Desk #3"
  }
];

export const INITIAL_TANKERS = [
  {
    id: "TNK-01",
    registrationNumber: "TS 09 UA 4512",
    operatorName: "Ramesh Reddy",
    operatorPhone: "+91 98481 12345",
    capacityLitres: 12000,
    availability: "available", // available, busy, offline
    status: "active",
    verificationStatus: "verified",
    tankMaterial: "Epoxy-Coated SS 304 (Potable Grade)",
    currentLocationName: "Jubilee Hills Circle",
    lat: 17.4319,
    lng: 78.4073,
    rating: 4.9,
    tripsCompleted: 42,
    totalWaterRecoveredLitres: 468000
  },
  {
    id: "TNK-02",
    registrationNumber: "TS 07 EK 8891",
    operatorName: "Syed Kareem",
    operatorPhone: "+91 99492 67890",
    capacityLitres: 10000,
    availability: "busy", // on duty with REP-HYD-102
    status: "active",
    verificationStatus: "verified",
    tankMaterial: "Food Grade Polyethylene Lined",
    currentLocationName: "Begumpet Corridor",
    lat: 17.4448,
    lng: 78.4682,
    rating: 4.8,
    tripsCompleted: 38,
    totalWaterRecoveredLitres: 370000
  },
  {
    id: "TNK-03",
    registrationNumber: "TS 10 UB 3409",
    operatorName: "Venkatesh Goud",
    operatorPhone: "+91 98853 45678",
    capacityLitres: 20000,
    availability: "available",
    status: "active",
    verificationStatus: "verified",
    tankMaterial: "Heavy Duty Multi-Chamber Steel",
    currentLocationName: "Kukatpally Depot",
    lat: 17.4910,
    lng: 78.4010,
    rating: 4.95,
    tripsCompleted: 61,
    totalWaterRecoveredLitres: 1180000
  },
  {
    id: "TNK-04",
    registrationNumber: "TS 08 EA 6120",
    operatorName: "Anjaiah Water Fleet",
    operatorPhone: "+91 97014 90123",
    capacityLitres: 8000,
    availability: "available",
    status: "active",
    verificationStatus: "verified",
    tankMaterial: "SS 316 Polished",
    currentLocationName: "Dilsukhnagar / Amberpet",
    lat: 17.3712,
    lng: 78.5284,
    rating: 4.7,
    tripsCompleted: 29,
    totalWaterRecoveredLitres: 228000
  },
  {
    id: "TNK-05",
    registrationNumber: "TS 11 EC 2201",
    operatorName: "Sri Sai Tankers (Mahesh B.)",
    operatorPhone: "+91 96185 23456",
    capacityLitres: 15000,
    availability: "offline",
    status: "maintenance",
    verificationStatus: "verified",
    tankMaterial: "Epoxy Lined Steel",
    currentLocationName: "Uppal Workshop",
    lat: 17.4012,
    lng: 78.5621,
    rating: 4.6,
    tripsCompleted: 19,
    totalWaterRecoveredLitres: 275000
  }
];

export const INITIAL_RECHARGE_PITS = [
  {
    id: "PIT-HYD-01",
    name: "KBR National Park Eco-Recharge Complex",
    teluguName: "కేబీఆర్ పార్క్ రీఛార్జ్ సముదాయం",
    locality: "Jubilee Hills / Banjara Hills",
    lat: 17.4237,
    lng: 78.4285,
    type: "Multi-Tiered Gravel & Sand Percolation Basins with Injection Shafts",
    dailyCapacityLitres: 150000,
    currentStoredLitres: 94000,
    soilType: "Fractured Weathered Granite & Red Sandy Loam",
    groundwaterDepthMeters: 28.5,
    waterTableRiseRecordedCm: 38.2,
    status: "approved_active",
    approvedBy: "Telangana State Ground Water Dept & GHMC",
    filterSystem: "4-Stage: Coarse Gravel, Pebbles, Activated Charcoal, River Sand",
    contactPerson: "Er. K. Srinivas, Ground Water Hydrologist"
  },
  {
    id: "PIT-HYD-02",
    name: "Sanjeevaiah Park Deep Aquifer Recharge Trench",
    teluguName: "సంజీవయ్య పార్క్ రీఛార్జ్ కేంద్రం",
    locality: "Necklace Road / Secunderabad",
    lat: 17.4335,
    lng: 78.4754,
    type: "Recharge Shaft with Annular Gravel Pack",
    dailyCapacityLitres: 100000,
    currentStoredLitres: 68000,
    soilType: "Alluvial Silty Sand over Semi-confined Granite Fissures",
    groundwaterDepthMeters: 22.0,
    waterTableRiseRecordedCm: 29.5,
    status: "approved_active",
    approvedBy: "GHMC Greenery & Lakes Wing",
    filterSystem: "Dual Sand Bed + Geo-textile Membrane Filter",
    contactPerson: "Smt. Sunitha Reddy, Assistant Executive Engineer"
  },
  {
    id: "PIT-HYD-03",
    name: "University of Hyderabad Eco-Catchment Aquifer",
    teluguName: "హైదరాబాద్ సెంట్రల్ యూనివర్సిటీ రీఛార్జ్ వెల్స్",
    locality: "Gachibowli",
    lat: 17.4589,
    lng: 78.3328,
    type: "Open Recharge Well with Silt Retention Basin",
    dailyCapacityLitres: 180000,
    currentStoredLitres: 112000,
    soilType: "Fissured Hard Granite Aquifer",
    groundwaterDepthMeters: 34.0,
    waterTableRiseRecordedCm: 44.0,
    status: "approved_active",
    approvedBy: "Central Ground Water Board (CGWB) & GHMC",
    filterSystem: "Sedimentation Tank + Sand Filter Bed",
    contactPerson: "Prof. P. Venkat Rao, Hydrological Sciences"
  },
  {
    id: "PIT-HYD-04",
    name: "Amberpet Public Grounds Percolation Shaft",
    teluguName: "అంబర్‌పేట రీఛార్జ్ కేంద్రం",
    locality: "Amberpet",
    lat: 17.3912,
    lng: 78.5134,
    type: "Subsurface Recharge Trench with Perforated Casing",
    dailyCapacityLitres: 80000,
    currentStoredLitres: 52000,
    soilType: "Clay Loam with High Infiltration Weathered Zone",
    groundwaterDepthMeters: 26.2,
    waterTableRiseRecordedCm: 22.1,
    status: "approved_active",
    approvedBy: "Telangana Ground Water Dept",
    filterSystem: "Reverse Graded Sand Gravel Filter",
    contactPerson: "M. Anji Reddy, Municipal Supervisor"
  },
  {
    id: "PIT-HYD-05",
    name: "JNTU Hyderabad Rainwater Harvesting Pit #3",
    teluguName: "జేఎన్‌టీయూ వర్షపు నీటి రీఛార్జ్ కేంద్రం",
    locality: "Kukatpally",
    lat: 17.4981,
    lng: 78.3892,
    type: "Deep Recharge Shaft with Hydrodynamic Silt Trap",
    dailyCapacityLitres: 120000,
    currentStoredLitres: 88000,
    soilType: "Weathered Granitic Sheet Rock",
    groundwaterDepthMeters: 31.0,
    waterTableRiseRecordedCm: 35.8,
    status: "approved_active",
    approvedBy: "GHMC West Zone & JNTUH Env Cell",
    filterSystem: "Mesh Debris Filter + Charcoal-Sand Media",
    contactPerson: "Dr. B. Chandra Sekhar"
  }
];

export const INITIAL_COLLECTION_REQUESTS = [
  {
    id: "REQ-2026-001",
    reportId: "REP-HYD-102",
    tankerId: "TNK-02",
    rechargePitId: "PIT-HYD-02",
    assignedAt: "2026-11-16T12:00:00Z",
    status: "water_collected", 
    // Workflow stages:
    // 1. requested
    // 2. assigned
    // 3. accepted
    // 4. reached_collection_point
    // 5. water_collected
    // 6. screening_passed
    // 7. approved_for_transport
    // 8. delivered
    // (or rejected_contaminated)
    stageIndex: 5,
    waterCollectedLitres: 10000,
    waterDeliveredLitres: 0,
    qualityScreening: {
      performedBy: "Syed Kareem (Certified Tanker Operator)",
      phValue: 7.2,
      turbidityNtu: 22,
      oilGreaseVisualCheck: "Passed (Clear, No Sheen)",
      chemicalOdorCheck: "Passed (Fresh Rainwater Odor)",
      sandGravelSettlingCleared: true,
      labApprovalStatus: "Passed - Safe for Aquifer Recharge",
      screenedAt: "2026-11-16T13:45:00Z",
      notes: "Clear runoff collected from concrete subway catchment. No sewage mixing detected."
    },
    notes: "Tanker actively preparing for delivery to Sanjeevaiah Park recharge facility."
  },
  {
    id: "REQ-2026-002",
    reportId: "REP-HYD-101",
    tankerId: "TNK-01",
    rechargePitId: "PIT-HYD-01",
    assignedAt: "2026-11-16T15:30:00Z",
    status: "accepted",
    stageIndex: 3,
    waterCollectedLitres: 0,
    waterDeliveredLitres: 0,
    qualityScreening: null,
    notes: "Tanker en route from Jubilee Hills to Tolichowki collection point."
  },
  {
    id: "REQ-2026-003",
    reportId: "REP-HYD-104",
    tankerId: "TNK-03",
    rechargePitId: "PIT-HYD-05",
    assignedAt: "2026-11-14T09:00:00Z",
    status: "delivered",
    stageIndex: 8,
    waterCollectedLitres: 20000,
    waterDeliveredLitres: 19800,
    qualityScreening: {
      performedBy: "Venkatesh Goud",
      phValue: 7.4,
      turbidityNtu: 18,
      oilGreaseVisualCheck: "Passed (Clear)",
      chemicalOdorCheck: "Passed (None)",
      sandGravelSettlingCleared: true,
      labApprovalStatus: "Passed - Safe for Aquifer Recharge",
      screenedAt: "2026-11-14T11:20:00Z",
      notes: "Excellent quality rainwater runoff from wide asphalt bypass."
    },
    notes: "Full cycle successfully completed. 19,800L safely infused into JNTU recharge aquifer."
  }
];

export const INITIAL_DAILY_CHART = [
  { day: "Mon", collectedLitres: 35000, deliveredLitres: 34200, rainfallMm: 42 },
  { day: "Tue", collectedLitres: 58000, deliveredLitres: 56500, rainfallMm: 68 },
  { day: "Wed", collectedLitres: 82000, deliveredLitres: 80800, rainfallMm: 95 },
  { day: "Thu", collectedLitres: 46000, deliveredLitres: 45000, rainfallMm: 51 },
  { day: "Fri", collectedLitres: 64000, deliveredLitres: 62900, rainfallMm: 74 },
  { day: "Sat", collectedLitres: 75000, deliveredLitres: 73800, rainfallMm: 88 },
  { day: "Sun", collectedLitres: 52000, deliveredLitres: 51200, rainfallMm: 60 }
];

export const INITIAL_AREA_COLLECTION = [
  { area: "Begumpet & Secunderabad", volumeKL: 210, reports: 18 },
  { area: "Tolichowki & Shaikpet", volumeKL: 175, reports: 14 },
  { area: "Kukatpally & Nizampet", volumeKL: 260, reports: 22 },
  { area: "Madhapur & Hitec City", volumeKL: 145, reports: 12 },
  { area: "Amberpet & Malakpet", volumeKL: 190, reports: 16 },
  { area: "Gachibowli & Financial Dist", volumeKL: 120, reports: 9 },
  { area: "Charminar & Old City", volumeKL: 165, reports: 15 }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    timestamp: "10 mins ago",
    title: "Collection Approved",
    message: "Admin approved waterlogging report REP-HYD-101 at Tolichowki. Tanker TS 09 UA 4512 assigned.",
    type: "success",
    role: "all"
  },
  {
    id: "NOTIF-02",
    timestamp: "45 mins ago",
    title: "Water Quality Cleared",
    message: "Screening passed for 10,000L at Begumpet Subway (pH 7.2, Turbidity 22 NTU). Safe for recharge.",
    type: "info",
    role: "all"
  },
  {
    id: "NOTIF-03",
    timestamp: "2 hours ago",
    title: "Recharge Completed",
    message: "19,800L successfully delivered to JNTUH Recharge Shaft #3. Groundwater recharge confirmed.",
    type: "success",
    role: "all"
  },
  {
    id: "NOTIF-04",
    timestamp: "4 hours ago",
    title: "New Inundation Alert",
    message: "Citizen reported waterlogging at Amberpet Ali Cafe (approx 14,000 Litres).",
    type: "warning",
    role: "admin"
  }
];

export const DEMO_USERS = [
  {
    id: "USER-CITIZEN",
    name: "Rahul Varma",
    email: "citizen@rainrescue.in",
    role: "citizen",
    phone: "+91 98480 23114",
    location: "Tolichowki, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USER-OPERATOR",
    name: "Ramesh Reddy",
    email: "operator@rainrescue.in",
    role: "operator",
    phone: "+91 98481 12345",
    tankerId: "TNK-01",
    location: "Jubilee Hills, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "USER-ADMIN",
    name: "Er. K. Srinivas (GHMC Officer)",
    email: "admin@rainrescue.in",
    role: "admin",
    phone: "+91 94400 11223",
    department: "Greater Hyderabad Municipal Corporation – Lakes & Ground Water Wing",
    location: "GHMC Head Office, Tank Bund Road",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

