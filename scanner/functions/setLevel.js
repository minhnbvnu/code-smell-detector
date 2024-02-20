function setLevel (level, val) {
    data[level] = val

    clearData(level)

    emitUpdateModelValue(getData())
    emitChange(getData())
  }