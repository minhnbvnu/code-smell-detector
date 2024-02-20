function getTilePositionFromLocal(localXY, zoom) {
  const pos = getPositionFromLocal(localXY);
  return project([pos.longitude,  pos.latitude], 1<<zoom);
}