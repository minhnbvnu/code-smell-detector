function detectWallCollisions(laser) {
  const wallsCollidedWith = [];

  if (laser.beam[0].y === 0) {
    wallsCollidedWith.push('top');
  }
  if (laser.beam[0].x === 0) {
    wallsCollidedWith.push('left');
  }
  if (laser.beam[0].x === width - 1) {
    wallsCollidedWith.push('right');
  }
  if (laser.beam[0].y === height - 1) {
    wallsCollidedWith.push('bottom');
  }

  return wallsCollidedWith;
}