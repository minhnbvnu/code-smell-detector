function isNativeDragEvent(sensorEvent) {
  return (/^drag/.test(sensorEvent.originalEvent.type)
  );
}