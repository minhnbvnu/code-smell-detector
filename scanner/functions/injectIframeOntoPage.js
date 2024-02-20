function injectIframeOntoPage(socialAction, fbcIframeHeight) {
  const fbcContent = buildInpageIframe(socialAction, fbcIframeHeight);

  const fbcWrapper = createElementWithClassList(
    "div",
    "fbc-wrapper"
  );
  const fbcChevron = createElementWithClassList(
    "div",
    "fbc-iframe-chevron"
  );

  fbcWrapper.appendChild(fbcChevron);
  fbcWrapper.appendChild(fbcContent);

  return fbcWrapper;
}