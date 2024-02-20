function moveInsideEmptyContainer(source, overContainer) {
  const oldContainer = source.parentNode;

  overContainer.appendChild(source);

  return { oldContainer, newContainer: overContainer };
}