function getBuildTimestamp () {
  const timestamp = new Date().toISOString().slice(0, 10);
  return timestamp;
}