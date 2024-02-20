function formatPercent(percent) {
  let formattedPercent = `${percent.toFixed(0)}%`;
  if (percent === 100) formattedPercent = '100%';else if (percent > 99) formattedPercent = '>99%';else if (percent < 0.01) formattedPercent = '<0.01%';else if (percent < 1) formattedPercent = `${percent.toFixed(2)}%`;else if (percent < 10) formattedPercent = `${percent.toFixed(1)}%`;
  return formattedPercent;
}