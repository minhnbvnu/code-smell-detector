function newDataset(pointStyle, i) {
  return {
    label: '',
    data: pointStyles.map(() => i),
    pointStyle: pointStyle,
    pointBackgroundColor: '#0000ff',
    pointBorderColor: '#00ff00',
    showLine: false
  };
}