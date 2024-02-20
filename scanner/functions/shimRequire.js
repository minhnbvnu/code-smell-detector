function shimRequire(filePath) {
  try {
    return require(path.resolve(this._moduleRoot, filePath))
  } catch (e) {
    this.logger.debug(
      "Failed to load '%s' from module root: '%s'. Stack: %s",
      filePath,
      this._moduleRoot,
      e.stack
    )
    return null
  }
}