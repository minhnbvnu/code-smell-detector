function moveOutsideContainer(source, over, overContainer) {
  const oldContainer = source.parentNode;

  if (over) {
    over.parentNode.insertBefore(source, over);
  } else {
    // need to figure out proper position
    overContainer.appendChild(source);
  }

  return { oldContainer, newContainer: source.parentNode };
}