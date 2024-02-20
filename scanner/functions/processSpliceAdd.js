function processSpliceAdd({
  self,
  selfDef,
  eventOptions,
  container
}) {
  const { added, silent } = eventOptions;
  const nextIndex = self.lastIndexOf(added[added.length - 1]) + 1;
  const next = self[nextIndex];
  let nextNode;

  // get a node of an item which is placed next to the last added item
  // it is needed to insert newly rendered items before
  if (next && typeof next === 'object') {
    nextNode = getAlreadyRendered({
      item: next,
      selfDef
    });
  }

  forEach(added, (item) => {
    if (item && typeof item === 'object') {
      // throw an error if node of an item is alread rendered
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
        if (nextNode) {
          container.insertBefore(node, nextNode);
        } else {
          container.appendChild(node);
        }

        if (!silent) {
          triggerOne(item, 'afterrender', itemEventOptions);
        }
      }
    }
  });
}