function remarkListOfPresets() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    zone(tree, 'presets', function (start, _, end) {
      return [start, structuredClone(list), end]
    })
  }
}