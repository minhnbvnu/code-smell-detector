function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }