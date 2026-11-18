export const formatLitres = (litres) => {
  if (!litres && litres !== 0) return '0 L';
  if (litres >= 1000000) {
    return `${(litres / 1000000).toFixed(2)} ML (Million L)`;
  }
  if (litres >= 1000) {
    return `${(litres / 1000).toLocaleString()} kL (${litres.toLocaleString()} L)`;
  }
  return `${litres.toLocaleString()} L`;
};

export const formatShortLitres = (litres) => {
  if (!litres && litres !== 0) return '0L';
  if (litres >= 1000000) return `${(litres / 1000000).toFixed(1)}M L`;
  if (litres >= 1000) return `${(litres / 1000).toFixed(0)}k L`;
  return `${litres} L`;
};

export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return isoString;
  }
};

