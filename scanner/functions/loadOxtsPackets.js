function loadOxtsPackets(content) {
  // Generator to read OXTS ground truth data.
  // Poses are given in an East-North-Up coordinate system
  // whose origin is the first GPS position.

  const values = content.split(' ').filter(Boolean);
  // TODO: this should validate the # of fields
  return getOxtsPacket(values);
}