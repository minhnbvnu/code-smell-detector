function makeReplacer(valueReader, thisArg) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    function (node, objectStack) {
      const value = valueReader.call(
        thisArg !== undefined ? thisArg : this,
        node,
        objectStack,
      );
      if (value !== undefined) {
        objectStack[objectStack.length - 1] = value;
      }
    }
  );
}