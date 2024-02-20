function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }