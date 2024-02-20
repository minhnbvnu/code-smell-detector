function advanceTheLaser(laser) {
  // If needed, update the vector of the laser
  const wallsCollidedWith = detectWallCollisions(laser);

  if (wallsCollidedWith.length !== 0) {
    wallsCollidedWith.forEach(wallCollidedWith => {
      // If we've just created a new laser on a boundary cell, this might not be true.
      if (laser.vector in reflections[wallCollidedWith]) {
        laser.vector = reflections[wallCollidedWith][laser.vector];
      }
    });
  }

  // Move the body of the laser
  if (laser.beam.length >= maxLaserLength) {
    // Move each laser segment to the location of the one in front of it,
    // starting at the tail until we reach the head.
    for (var i = laser.beam.length - 1; i > 0; i--) {
      laser.beam[i] = Object.assign({}, laser.beam[i - 1]);
    }
  } else {
    // Leave the body as-is and clone the head of the laser
    laser.beam.unshift({ x: laser.beam[0].x, y: laser.beam[0].y });
  }

  // Move the head of the laser, based on the current vector.
  if (laser.vector === '↗') {
    laser.beam[0].x++;
    laser.beam[0].y--;
  } else
  if (laser.vector === '↘') {
    laser.beam[0].x++;
    laser.beam[0].y++;
  } else
  if (laser.vector === '↙') {
    laser.beam[0].x--;
    laser.beam[0].y++;
  } else
  if (laser.vector === '↖') {
    laser.beam[0].x--;
    laser.beam[0].y--;
  }
}