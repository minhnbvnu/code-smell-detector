function buildInpageIframe(socialAction, fbcIframeHeight) {

  const iframe = document.createElement("iframe");
  iframe.src = browser.runtime.getURL(`inpage-content.html?action=${socialAction}`);
  iframe.width = 350;
  // This height is derived from the Figma file. However, this is just the starting instance of the iframe/inpage menu. After it's built out, it resizes itself based on the inner contents.
  iframe.height = fbcIframeHeight;
  iframe.title = browser.i18n.getMessage("facebookContainer");
  iframe.tabIndex = 0;
  iframe.ariaHidden = "false";
  iframe.id = socialAction;
  iframe.classList.add("fbc-content-box");

  return iframe;
}