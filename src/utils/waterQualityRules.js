// ==========================================================================
// RainRescue – Water Quality Screening & Aquifer Protection Standards
// ==========================================================================

export const WATER_QUALITY_LIMITS = {
  PH_MIN: 6.5,
  PH_MAX: 8.5,
  TURBIDITY_MAX_NTU: 35, // Acceptable for pre-settled rainwater before final gravel-sand filter
  TDS_MAX_PPM: 500
};

export const evaluateWaterQuality = (params) => {
  const {
    phValue,
    turbidityNtu,
    oilGreaseVisualCheck,
    chemicalOdorCheck,
    sandGravelSettlingCleared
  } = params;

  const errors = [];
  const warnings = [];

  // 1. pH Check
  const ph = parseFloat(phValue);
  if (isNaN(ph)) {
    errors.push("Invalid pH measurement.");
  } else if (ph < WATER_QUALITY_LIMITS.PH_MIN) {
    errors.push(`pH is acidic (${ph} < ${WATER_QUALITY_LIMITS.PH_MIN}). Potential industrial or chemical acid runoff.`);
  } else if (ph > WATER_QUALITY_LIMITS.PH_MAX) {
    errors.push(`pH is alkaline (${ph} > ${WATER_QUALITY_LIMITS.PH_MAX}). Potential alkaline contamination.`);
  }

  // 2. Turbidity Check
  const turbidity = parseFloat(turbidityNtu);
  if (isNaN(turbidity)) {
    errors.push("Invalid Turbidity measurement.");
  } else if (turbidity > WATER_QUALITY_LIMITS.TURBIDITY_MAX_NTU) {
    errors.push(`Turbidity (${turbidity} NTU) exceeds recharge limit (${WATER_QUALITY_LIMITS.TURBIDITY_MAX_NTU} NTU). Silt settling required.`);
  } else if (turbidity > 20) {
    warnings.push("Moderate suspended silt. Secondary sand filtration chamber must be engaged at recharge pit.");
  }

  // 3. Oil & Grease
  if (oilGreaseVisualCheck !== "Passed (Clear, No Sheen)" && oilGreaseVisualCheck !== "Passed (Clear)") {
    errors.push("Hydrocarbon / oil sheen detected! Strictly prohibited for groundwater recharge.");
  }

  // 4. Odor & Sewage / Chemical Check
  if (chemicalOdorCheck !== "Passed (Fresh Rainwater Odor)" && chemicalOdorCheck !== "Passed (None)") {
    errors.push("Chemical or anaerobic odor detected. Risk of underground aquifer contamination.");
  }

  // 5. Settling and pre-filter
  if (!sandGravelSettlingCleared) {
    errors.push("Sedimentation/settling stage not cleared.");
  }

  const isSafeForRecharge = errors.length === 0;

  return {
    isSafeForRecharge,
    statusText: isSafeForRecharge ? "Passed - Approved for Aquifer Recharge" : "Failed - Divert Away from Aquifer",
    errors,
    warnings
  };
};

