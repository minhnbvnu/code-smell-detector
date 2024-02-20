function getMeshBoundingBox(attributes) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    const positions = attributes.POSITION ? attributes.POSITION.value : [];
    const len2 = positions && positions.length;
    for (let i2 = 0; i2 < len2; i2 += 3) {
      const x = positions[i2];
      const y = positions[i2 + 1];
      const z = positions[i2 + 2];
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
      minZ = z < minZ ? z : minZ;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      maxZ = z > maxZ ? z : maxZ;
    }
    return [
      [minX, minY, minZ],
      [maxX, maxY, maxZ]
    ];
  }