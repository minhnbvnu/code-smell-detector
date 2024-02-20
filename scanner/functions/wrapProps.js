function wrapProps(obj, size) {
    const returnObj = {};
    for (const key in obj) {
      returnObj[key] = { value: obj[key], size };
    }
    return returnObj;
  }