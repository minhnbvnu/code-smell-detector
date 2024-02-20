function desktopOrientation(iframeBox, iframeChevron, offsetY, fencePosition, iframePaddingAllowance, fencePos, offsetX) {
  // Desktop Values
  const xRight = fencePosition.x + offsetX + fencePos.offsetWidth;
  const xLeft = fencePosition.x - iframePaddingAllowance;
  const yPos = fencePosition.y - offsetY;

  // Position iframe relative to FBC Icon
  iframeBox.style.marginLeft = `${xRight}px`;
  iframeBox.style.marginTop = `${yPos}px`;

  // Add Chevron (Default left arrow)
  const xPosChevron = xRight - iframeChevron.offsetWidth;
  const yPosChevron = yPos + offsetY;

  iframeChevron.classList.remove("fbc-chevron-arrow-top");
  iframeChevron.style.marginLeft = `${xPosChevron}px`;
  iframeChevron.style.marginTop = `${yPosChevron}px`;

  const calculateOffsetDiff = window.innerWidth - fencePosition.x;

  // Flip the iframe to show on the left side when icon is too close to the edge
  if (iframePaddingAllowance > calculateOffsetDiff) {
    iframeBox.style.marginLeft = `${xLeft}px`;
    iframeChevron.classList.add("fbc-chevron-arrow-right");
    iframeChevron.style.marginLeft = `${xPosChevron - fencePos.offsetWidth - iframeChevron.offsetWidth - offsetX}px`;
    return;
  }
  return iframeChevron.classList.remove("fbc-chevron-arrow-right");
}