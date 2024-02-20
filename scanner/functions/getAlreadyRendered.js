function getAlreadyRendered({
  item,
  selfDef
}) {
  const itemDef = defs.get(item);
  const { id: selfId } = selfDef;

  // if item object is defined in object defs
  if (itemDef) {
    const { renderedInArrays } = itemDef;

    // if item's node is already rendered for an array then return it
    if (renderedInArrays && renderedInArrays[selfId]) {
      const node = renderedInArrays[selfId];
      return node.__replacedByNode || node;
    }
  }

  return undefined;
}