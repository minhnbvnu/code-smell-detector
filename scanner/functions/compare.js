function compare(v1, v2) {
    var result = 0;
    if (v1.type === v2.type) {
      if (v1.value !== v2.value) {
        result = v1.value < v2.value ? -1 : 1;
      }
    } else {
      result = v1.type < v2.type ? -1 : 1;
    }
    return result;
  }