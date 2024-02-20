function parsedPoseCheck(t, parsedPose, xvizPose) {
  t.equal(parsedPose.x, xvizPose.position[0]);
  t.equal(parsedPose.y, xvizPose.position[1]);
  t.equal(parsedPose.z, xvizPose.position[2]);

  t.equal(parsedPose.roll, xvizPose.orientation[0]);
  t.equal(parsedPose.pitch, xvizPose.orientation[1]);
  t.equal(parsedPose.yaw, xvizPose.orientation[2]);

  t.equal(parsedPose.latitude, xvizPose.map_origin.latitude);
  t.equal(parsedPose.longitude, xvizPose.map_origin.longitude);
  t.equal(parsedPose.altitude, xvizPose.map_origin.altitude);
}