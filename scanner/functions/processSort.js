function processSort({
  self,
  selfDef,
  // eventOptions,
  container
}) {
  // just re-insert rendered nodes in new order
  forEach(self, (item) => {
    if (item && typeof item === 'object') {
      const node = getAlreadyRendered({
        item,
        selfDef
      });

      if (node) {
        container.appendChild(node);
      }
    }
  });
}