function prepareToDraw() {
  drawAnimationFrameID = null;
  redrawTimeoutID = null;
  const now = getCurrentTime();
  let earliestExpiration = Number.MAX_VALUE; // Remove any items that have already expired.

  nodeToData.forEach((data, node) => {
    if (data.expirationTime < now) {
      nodeToData.delete(node);
    } else {
      earliestExpiration = Math.min(earliestExpiration, data.expirationTime);
    }
  });
  draw(nodeToData);

  if (earliestExpiration !== Number.MAX_VALUE) {
    redrawTimeoutID = setTimeout(prepareToDraw, earliestExpiration - now);
  }
}