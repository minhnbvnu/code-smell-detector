function positionIframe(fencePos) {
  const fencePosition = fencePos.getBoundingClientRect();
  const iframeBox = document.querySelector(".fbc-content-box");
  const iframeWrapper = document.querySelector(".fbc-wrapper");
  const iframeElement = iframeWrapper.getElementsByTagName("iframe");
  const iframeChevron = document.querySelector(".fbc-iframe-chevron");

  const offsetX = 20;
  const offsetY = 55;

  const iframePaddingAllowance = iframeBox.offsetWidth + offsetX;

  const iconRightAllowance = window.innerWidth - fencePosition.x + fencePos.offsetWidth;
  const iconLeftAllowance = window.innerWidth - iconRightAllowance;

  if (iconRightAllowance > iframePaddingAllowance || iconLeftAllowance > iframePaddingAllowance) {
    return desktopOrientation(iframeBox, iframeChevron, offsetY, fencePosition, iframePaddingAllowance, fencePos, offsetX);
  }
  return mobileOrientation(iframeElement, iframeChevron, iframeBox, fencePosition, offsetY);
}