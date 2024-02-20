function uniqify(origId) {
    var id = origId,
        n = 1;
    while (id in svgIds) {
      n++;
      id = origId + '-' + n;
    }
    if (n == 2) {
      dupes.push(origId);
    }
    svgIds[id] = true;
    return id;
  }