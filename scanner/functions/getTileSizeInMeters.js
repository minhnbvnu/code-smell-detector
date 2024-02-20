function getTileSizeInMeters( latitude, zoom) {
  return EARTH_CIRCUMFERENCE_IN_METERS * Math.cos(latitude / 180 * Math.PI) / 
         Math.pow(2, zoom);
}