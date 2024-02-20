function formatTimestamp(ms) {
  return ms.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + 'ms';
}