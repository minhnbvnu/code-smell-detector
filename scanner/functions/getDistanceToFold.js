function getDistanceToFold(sentinel, scrollContainerScrollPosition, scrollContainerRootRect) {
  let rootRect = scrollContainerRootRect;

  // this means the container the doesn't have any items yet - it's empty
  if (!sentinel) {
    return rootRect.height * -1;
  }

  let scrollYTop = scrollContainerScrollPosition.y;
  let boundingRect = sentinel.getBoundingClientRect();

  let scrollYBottom = scrollYTop + rootRect.height;
  let bottom = scrollYTop + boundingRect.bottom - rootRect.top;

  return Math.trunc(bottom - scrollYBottom);
}