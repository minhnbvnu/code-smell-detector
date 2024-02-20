function storeAsGlobal(id, path, count) {
    if (isMostRecentlyInspectedElement(id)) {
      const value = Object(utils["n" /* getInObject */])(mostRecentlyInspectedElement, path);
      const key = `$reactTemp${count}`;
      window[key] = value;
      console.log(key);
      console.log(value);
    }
  }