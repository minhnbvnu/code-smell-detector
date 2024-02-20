function generateMapUrl(items) {
    const mapUrl = {};
    for (const key in items) {
      mapUrl[`{${key}}`] = items[key];
    }
    return mapUrl;
  }