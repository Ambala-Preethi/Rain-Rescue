export const exportReportsToCsv = (reports, filename = 'rainrescue_reports.csv') => {
  if (!reports || !reports.length) return;

  const headers = [
    "Report ID",
    "Area / Locality",
    "Latitude",
    "Longitude",
    "Estimated Litres",
    "Depth (Feet)",
    "Severity",
    "Status",
    "Reported Date",
    "Reported By",
    "Citizen Contact",
    "Verified By"
  ];

  const rows = reports.map(r => [
    `"${r.id || ''}"`,
    `"${r.area || ''}"`,
    r.lat || '',
    r.lng || '',
    r.waterVolumeLitres || 0,
    r.waterDepthFeet || 0,
    `"${r.severity || ''}"`,
    `"${r.status || ''}"`,
    `"${r.reportedAt || ''}"`,
    `"${r.reportedBy || ''}"`,
    `"${r.citizenPhone || ''}"`,
    `"${r.verifiedBy || 'Unverified'}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

