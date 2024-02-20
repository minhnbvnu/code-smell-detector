function getRidgeDistances (polygon, index) {
    const ridge = [ polygon[index[0]], polygon[index[1]] ];
    return polygon.map(point => {
      return getDistanceToLine(point, ridge);
    });
  }