function isJson (text) {
    try { JSON.parse(text); return true } catch (error) { return false }
  }