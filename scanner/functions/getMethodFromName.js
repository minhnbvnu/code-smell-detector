function getMethodFromName(nodule, method) {
    let _nodule

    if (nodule === 'http') {
      _nodule = http
    }
    if (nodule === 'https') {
      _nodule = https
    }

    return _nodule[method]
  }