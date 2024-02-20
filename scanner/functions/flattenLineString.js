function flattenLineString(coordinates, data, indices, options) {
    indices.push(data.length);
    for (const c of coordinates) {
      data.push(...c);
      for (let i = c.length; i < options.coordLength; i++) {
        data.push(0);
      }
    }
  }