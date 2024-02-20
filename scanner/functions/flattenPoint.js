function flattenPoint(coordinates, data, indices, options) {
    indices.push(data.length);
    data.push(...coordinates);
    for (let i = coordinates.length; i < options.coordLength; i++) {
      data.push(0);
    }
  }