function getFirstArray(json) {
    if (Array.isArray(json)) {
      return json;
    }
    if (json && typeof json === "object") {
      for (const value of Object.values(json)) {
        const array = getFirstArray(value);
        if (array) {
          return array;
        }
      }
    }
    return null;
  }