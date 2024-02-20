function getGeospatialVector(from, to) {
  from = {
    longitude: from.longitude || 0,
    latitude: from.latitude || 0,
    altitude: from.altitude || 0,
    x: from.x || 0,
    y: from.y || 0,
    z: from.z || 0,
    yaw: from.yaw || 0
  };

  to = {
    longitude: to.longitude || 0,
    latitude: to.latitude || 0,
    altitude: to.altitude || 0,
    x: to.x || 0,
    y: to.y || 0,
    z: to.z || 0,
    yaw: to.yaw || 0
  };

  const fromPoint = turf.destination(
    [from.longitude, from.latitude, from.altitude],
    Math.sqrt(from.x * from.x + from.y * from.y),
    Math.PI / 2 - from.yaw,
    {units: 'meters'}
  );

  const toPoint = turf.destination(
    [to.longitude, to.latitude, to.altitude],
    Math.sqrt(to.x * to.x + to.y * to.y),
    Math.PI / 2 - to.yaw,
    {units: 'meters'}
  );

  const distInMeters = turf.distance(fromPoint, toPoint, {units: 'meters'});

  // Bearing is degrees from north, positive is clockwise
  const bearing = turf.bearing(fromPoint, toPoint);
  const bearingInRadians = turf.degreesToRadians(bearing);

  const diffZ = to.altitude + to.z - from.altitude - from.z;

  return [
    distInMeters * Math.sin(bearingInRadians),
    distInMeters * Math.cos(bearingInRadians),
    diffZ
  ];
}