function redrawGrid() {
  // clear the existing map
  grid = cbl.getEmptyMatrix();

  // Draw the lasers on the map.
  lasers.forEach(laser => {
    laser.beam.forEach(laserSegment => {
      grid[laserSegment.y][laserSegment.x] = 1
    });
  });

  cbl.setData(grid);
}