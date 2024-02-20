function angleToTarget(source, target) {
  return Math.atan2(target.y - source.y, target.x - source.x);
}