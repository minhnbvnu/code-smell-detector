function locationHash(lon, lat) {
  return Math.round(lon * 5) + " x " + Math.round(lat * 5);
}