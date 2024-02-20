function recursivelyAddCoords(xmlEl) {
  if ($(xmlEl).attr('coords') || !xmlEl.children) {
    return;
  }

  const children = $(xmlEl).children().toArray();
  if (children.length === 0) {
    return;
  }

  for (const child of children) {
    recursivelyAddCoords(child);
  }

  const childCoords = [];

  for (const child of children) {
    if (!$(child).attr('coords')) continue;
    childCoords.push($(child).attr('coords').split(',').map(parseFloat));
  }

  const boundingCoords = determineBounds(childCoords);
  if (Math.abs(boundingCoords[0]) != Infinity) {
    $(xmlEl).attr('coords', boundingCoords.join(','));
  }
}