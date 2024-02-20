function getPositionFromLocal(localXY) {
  return {
    longitude: APP.position.longitude + localXY[0] / METERS_PER_DEGREE_LONGITUDE,
    latitude: APP.position.latitude - localXY[1] / METERS_PER_DEGREE_LATITUDE
  };
}