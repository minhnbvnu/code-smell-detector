function getSortedValues(obj, key) {
    const setValues = new Set(obj.map((p) => p[key]));
    let returnValue = Array.from(setValues).sort().map((x, i) => 
    {
      return {'value': i, 'label':x};
    })
    return returnValue;
  }