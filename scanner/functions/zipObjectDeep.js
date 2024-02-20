function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }