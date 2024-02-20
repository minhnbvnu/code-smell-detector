function hasBom (buffer) {
    return BOM.every(
      (charCode, index) => buffer.charCodeAt(index) === charCode
    )
  }