function dashCase(value) {
  return value.replace(/[A-Z]/g, replacer)

  /**
   * @param {string} $0
   * @returns {string}
   */
  function replacer($0) {
    return '-' + $0.toLowerCase()
  }
}