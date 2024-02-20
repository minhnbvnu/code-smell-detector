function mobileOrientation(iframeElement, iframeChevron, iframeBox, fencePosition, offsetY){
  // Mobile Values
  const xPosMobile = fencePosition.x;
  const yPosMobile = fencePosition.y + offsetY;

  for (const panels of iframeElement) {
    panels.width = window.innerWidth;
    if (window.innerWidth > 480) {
      panels.width = 350;
    }
  }

  iframeChevron.classList.add("fbc-chevron-arrow-top");
  iframeBox.style.marginTop = `${yPosMobile}px`;

  const xPosChevronMobile = xPosMobile;
  const yPosChevronMobile = yPosMobile - iframeChevron.offsetWidth;

  iframeChevron.style.marginLeft = `${xPosChevronMobile}px`;
  iframeChevron.style.marginTop = `${yPosChevronMobile}px`;
}