function checkAlreadyRendered({
  item,
  selfDef
}) {
  const itemDef = defs.get(item);
  const { id: selfId } = selfDef;

  // if item object is defined in object defs
  if (itemDef) {
    const { renderedInArrays } = itemDef;

    // if item's node is already rendered for an array
    // then throw an error
    if (renderedInArrays && renderedInArrays[selfId]) {
      throw seempleError('array:add_render_twice');
    }
  }
}