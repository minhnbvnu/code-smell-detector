function setTime() {
  startDate.setMinutes(startDate.getMinutes() + 15);
  if (startDate > Date.now()) {
    startDate = threeHoursAgo();
  }
  layers[1].getSource().updateParams({'TIME': startDate.toISOString()});
  updateInfo();
}