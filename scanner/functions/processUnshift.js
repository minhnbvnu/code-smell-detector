function processUnshift({
  self,
  selfDef,
  eventOptions,
  container
}) {
  const { added, silent } = eventOptions;

  // iterate over all added items in opposite order
  for (let i = added.length - 1; i + 1; i--) {
    const item = added[i];
    if (item && typeof item === 'object') {
      // if a node of an item is already rendered then throw an error
      checkAlreadyRendered({
        item,
        selfDef
      });

      const { node, itemEventOptions } = renderItemNode({
        selfDef,
        self,
        item,
        eventOptions
      });

      if (node) {
        if (container.firstChild) {
          container.insertBefore(node, container.firstChild);
        } else {
          container.appendChild(node);
        }

        if (!silent) {
          triggerOne(item, 'afterrender', itemEventOptions);
        }
      }
    }
  }
}