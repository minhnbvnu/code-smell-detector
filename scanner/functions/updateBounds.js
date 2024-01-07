function updateBounds(mesh) {
    let minX = mesh.coords[0][0],
        minY = mesh.coords[0][1],
        maxX = minX,
        maxY = minY;

    for (let i = 1, ii = mesh.coords.length; i < ii; i++) {
      const x = mesh.coords[i][0],
            y = mesh.coords[i][1];
      minX = minX > x ? x : minX;
      minY = minY > y ? y : minY;
      maxX = maxX < x ? x : maxX;
      maxY = maxY < y ? y : maxY;
    }

    mesh.bounds = [minX, minY, maxX, maxY];
  }