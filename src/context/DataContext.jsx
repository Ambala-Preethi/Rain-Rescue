import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../data/storageKeys';
import {
  INITIAL_REPORTS,
  INITIAL_TANKERS,
  INITIAL_RECHARGE_PITS,
  INITIAL_COLLECTION_REQUESTS,
  INITIAL_DAILY_CHART,
  INITIAL_AREA_COLLECTION
} from '../data/mockData';
import { useNotifications } from './NotificationContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { addNotification } = useNotifications();

  // Load from LocalStorage or fall back to demo data
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REPORTS;
  });

  const [tankers, setTankers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TANKERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TANKERS;
  });

  const [rechargePits, setRechargePits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECHARGE_PITS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RECHARGE_PITS;
  });

  const [collectionRequests, setCollectionRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTION_REQUESTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COLLECTION_REQUESTS;
  });

  const [dailyChartData, setDailyChartData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS_DAILY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DAILY_CHART;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TANKERS, JSON.stringify(tankers));
  }, [tankers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECHARGE_PITS, JSON.stringify(rechargePits));
  }, [rechargePits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTION_REQUESTS, JSON.stringify(collectionRequests));
  }, [collectionRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS_DAILY, JSON.stringify(dailyChartData));
  }, [dailyChartData]);

  // --- ACTIONS ---

  // 1. Citizen submits waterlogging report
  const addReport = (newReportData) => {
    const reportId = `REP-HYD-${Math.floor(100 + Math.random() * 900)}`;
    const newReport = {
      id: reportId,
      area: newReportData.area,
      locality: newReportData.locality || "Hyderabad",
      lat: Number(newReportData.lat) || 17.4045,
      lng: Number(newReportData.lng) || 78.4121,
      reportedBy: newReportData.reportedBy || "Citizen Reporter",
      citizenPhone: newReportData.citizenPhone || "+91 98480 00000",
      waterVolumeLitres: Number(newReportData.waterVolumeLitres) || 15000,
      waterDepthFeet: Number(newReportData.waterDepthFeet) || 2.0,
      severity: newReportData.severity || "Moderate",
      reportedAt: new Date().toISOString(),
      status: "pending_verification",
      photoUrl: newReportData.photoUrl || "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
      description: newReportData.description || "Excess rainwater accumulation reported by citizen.",
      waterSource: newReportData.waterSource || "Urban Stormwater Runoff",
      verifiedBy: null
    };

    setReports(prev => [newReport, ...prev]);
    addNotification(
      "Report Submitted",
      `New waterlogging report logged at ${newReport.area}. Awaiting municipal verification.`,
      "info"
    );
    return newReport;
  };

  // 2. Municipal Administrator verifies or rejects a report
  const verifyReport = (reportId, approved = true, adminName = "GHMC Desk Officer", reason = "") => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          status: approved ? "approved_for_collection" : "rejected_contaminated",
          verifiedBy: adminName,
          rejectionReason: approved ? null : reason
        };
      }
      return rep;
    }));

    if (approved) {
      addNotification("Report Verified", `Report ${reportId} approved for tanker assignment.`, "success");
    } else {
      addNotification("Report Flagged / Diverted", `Report ${reportId} marked unsuitable for recharge (${reason}).`, "warning");
    }
  };

  // 3. Admin assigns a tanker and destination recharge pit to an approved report
  const assignTankerToReport = (reportId, tankerId, rechargePitId) => {
    const targetReport = reports.find(r => r.id === reportId);
    const targetTanker = tankers.find(t => t.id === tankerId);
    const targetPit = rechargePits.find(p => p.id === rechargePitId);

    if (!targetReport || !targetTanker || !targetPit) return false;

    const requestId = `REQ-${new Date().getFullYear()}-${String(collectionRequests.length + 1).padStart(3, '0')}`;
    const newRequest = {
      id: requestId,
      reportId,
      tankerId,
      rechargePitId,
      assignedAt: new Date().toISOString(),
      status: "assigned",
      stageIndex: 2, // 1: requested, 2: assigned, 3: accepted, 4: reached_point, 5: water_collected, 6: screening_passed, 7: transport_approved, 8: delivered
      waterCollectedLitres: 0,
      waterDeliveredLitres: 0,
      qualityScreening: null,
      notes: `Assigned tanker ${targetTanker.registrationNumber} to collect from ${targetReport.area} for recharge at ${targetPit.name}.`
    };

    // Update collection requests
    setCollectionRequests(prev => [newRequest, ...prev]);

    // Update report status
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: "in_progress" } : r));

    // Update tanker availability
    setTankers(prev => prev.map(t => t.id === tankerId ? { ...t, availability: "busy" } : t));

    addNotification(
      "Mission Assigned",
      `Tanker ${targetTanker.registrationNumber} assigned to collect rainwater at ${targetReport.area}.`,
      "info"
    );

    return newRequest;
  };

  // 4. Tanker operator updates collection status along the 10-step lifecycle
  const updateRequestStage = (requestId, newStatus, stageIndex, additionalData = {}) => {
    setCollectionRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const updated = {
          ...req,
          status: newStatus,
          stageIndex,
          ...additionalData
        };
        return updated;
      }
      return req;
    }));

    // If delivered successfully, complete the workflow and update pit & tanker totals
    if (newStatus === "delivered") {
      const req = collectionRequests.find(r => r.id === requestId);
      const deliveredQty = Number(additionalData.waterDeliveredLitres) || req.waterCollectedLitres || 10000;

      // Mark report completed
      if (req?.reportId) {
        setReports(prev => prev.map(r => r.id === req.reportId ? { ...r, status: "completed" } : r));
      }

      // Free tanker
      if (req?.tankerId) {
        setTankers(prev => prev.map(t => {
          if (t.id === req.tankerId) {
            return {
              ...t,
              availability: "available",
              tripsCompleted: (t.tripsCompleted || 0) + 1,
              totalWaterRecoveredLitres: (t.totalWaterRecoveredLitres || 0) + deliveredQty
            };
          }
          return t;
        }));
      }

      // Increase pit recharge amount
      if (req?.rechargePitId) {
        setRechargePits(prev => prev.map(p => {
          if (p.id === req.rechargePitId) {
            return {
              ...p,
              currentStoredLitres: (p.currentStoredLitres || 0) + deliveredQty,
              waterTableRiseRecordedCm: Number(((p.waterTableRiseRecordedCm || 25) + 0.8).toFixed(1))
            };
          }
          return p;
        }));
      }

      // Update daily chart
      setDailyChartData(prev => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last) {
          last.collectedLitres += deliveredQty;
          last.deliveredLitres += deliveredQty;
        }
        return copy;
      });

      addNotification(
        "Recharge Successful",
        `${deliveredQty.toLocaleString()} Litres of screened rainwater infused into aquifer!`,
        "success"
      );
    }
  };

  // 5. Submit water quality screening (Step 7 & 8)
  const submitQualityScreening = (requestId, screeningData) => {
    const isApproved = screeningData.labApprovalStatus?.toLowerCase().includes("passed") || 
      (screeningData.phValue >= 6.5 && screeningData.phValue <= 8.5 && screeningData.turbidityNtu <= 35);

    const nextStatus = isApproved ? "approved_for_transport" : "rejected_contaminated";
    const nextStage = isApproved ? 7 : -1;

    setCollectionRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: nextStatus,
          stageIndex: nextStage,
          qualityScreening: {
            ...screeningData,
            screenedAt: new Date().toISOString()
          }
        };
      }
      return req;
    }));

    if (isApproved) {
      addNotification(
        "Water Quality Approved",
        `Quality screening passed (pH: ${screeningData.phValue}, NTU: ${screeningData.turbidityNtu}). Ready for recharge delivery.`,
        "success"
      );
    } else {
      addNotification(
        "Screening Failed – Runoff Diverted",
        `Water quality failed safety criteria. Runoff diverted away from groundwater recharge to prevent contamination.`,
        "danger"
      );
    }
  };

  // 6. Tanker Management
  const addTanker = (tankerData) => {
    const newTanker = {
      id: `TNK-${String(tankers.length + 1).padStart(2, '0')}`,
      registrationNumber: tankerData.registrationNumber.toUpperCase(),
      operatorName: tankerData.operatorName,
      operatorPhone: tankerData.operatorPhone || "+91 98480 00000",
      capacityLitres: Number(tankerData.capacityLitres) || 10000,
      availability: "available",
      status: "active",
      verificationStatus: "verified",
      tankMaterial: tankerData.tankMaterial || "Potable Grade Stainless Steel",
      currentLocationName: tankerData.currentLocationName || "Hyderabad Central Depot",
      lat: Number(tankerData.lat) || 17.4125,
      lng: Number(tankerData.lng) || 78.4350,
      rating: 5.0,
      tripsCompleted: 0,
      totalWaterRecoveredLitres: 0
    };
    setTankers(prev => [...prev, newTanker]);
    addNotification("Tanker Registered", `Tanker ${newTanker.registrationNumber} enrolled and verified.`, "success");
    return newTanker;
  };

  const toggleTankerAvailability = (tankerId) => {
    setTankers(prev => prev.map(t => {
      if (t.id === tankerId) {
        const nextAvail = t.availability === "available" ? "busy" : "available";
        return { ...t, availability: nextAvail };
      }
      return t;
    }));
  };

  // 7. Recharge Pit Management
  const addRechargePit = (pitData) => {
    const newPit = {
      id: `PIT-HYD-${String(rechargePits.length + 1).padStart(2, '0')}`,
      name: pitData.name,
      teluguName: pitData.teluguName || "రీఛార్జ్ కేంద్రం",
      locality: pitData.locality || "Hyderabad",
      lat: Number(pitData.lat) || 17.4200,
      lng: Number(pitData.lng) || 78.4500,
      type: pitData.type || "Gravel & Sand Filtration Aquifer Shaft",
      dailyCapacityLitres: Number(pitData.dailyCapacityLitres) || 100000,
      currentStoredLitres: 0,
      soilType: pitData.soilType || "Weathered Granitic Aquifer",
      groundwaterDepthMeters: Number(pitData.groundwaterDepthMeters) || 25.0,
      waterTableRiseRecordedCm: 0,
      status: "approved_active",
      approvedBy: "Telangana Ground Water Dept & GHMC",
      filterSystem: pitData.filterSystem || "4-Stage Sand Gravel & Carbon Bed",
      contactPerson: pitData.contactPerson || "Municipal Ward Officer"
    };
    setRechargePits(prev => [...prev, newPit]);
    addNotification("Recharge Facility Enrolled", `New recharge pit '${newPit.name}' approved and mapped.`, "success");
    return newPit;
  };

  // 8. Reset to default demo data
  const resetToDemoData = () => {
    setReports(INITIAL_REPORTS);
    setTankers(INITIAL_TANKERS);
    setRechargePits(INITIAL_RECHARGE_PITS);
    setCollectionRequests(INITIAL_COLLECTION_REQUESTS);
    setDailyChartData(INITIAL_DAILY_CHART);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.TANKERS);
    localStorage.removeItem(STORAGE_KEYS.RECHARGE_PITS);
    localStorage.removeItem(STORAGE_KEYS.COLLECTION_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS_DAILY);
    addNotification("Demo Data Restored", "All demonstration records have been refreshed to defaults.", "info");
  };

  // --- DERIVED METRICS ---
  const totalReportsCount = reports.length;
  const availableTankersCount = tankers.filter(t => t.availability === "available").length;
  const totalWaterCollectedLitres = collectionRequests.reduce((sum, r) => sum + (r.waterCollectedLitres || 0), 0) + 94000;
  const totalWaterDeliveredLitres = collectionRequests.reduce((sum, r) => sum + (r.waterDeliveredLitres || 0), 0) + 89000;
  const activeRequestsCount = collectionRequests.filter(r => r.status !== "delivered" && r.status !== "rejected_contaminated").length;
  const completedRechargeOperationsCount = collectionRequests.filter(r => r.status === "delivered").length + 18;

  // Estimated groundwater level impact (in centimeters)
  const estimatedGroundwaterRiseCm = Number((totalWaterDeliveredLitres / 3500).toFixed(1));

  return (
    <DataContext.Provider value={{
      reports,
      tankers,
      rechargePits,
      collectionRequests,
      dailyChartData,
      areaCollectionData: INITIAL_AREA_COLLECTION,
      metrics: {
        totalReportsCount,
        availableTankersCount,
        totalWaterCollectedLitres,
        totalWaterDeliveredLitres,
        activeRequestsCount,
        completedRechargeOperationsCount,
        estimatedGroundwaterRiseCm
      },
      addReport,
      verifyReport,
      assignTankerToReport,
      updateRequestStage,
      submitQualityScreening,
      addTanker,
      toggleTankerAvailability,
      addRechargePit,
      resetToDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

