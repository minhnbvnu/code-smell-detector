function message(value, area) {
  const acres = (area / 4046.86)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return acres + ' acres at<br>' + value.toFixed(2) + ' VGI or above';
}