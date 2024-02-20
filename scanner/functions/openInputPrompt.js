function openInputPrompt(socialAction, fencePos, target, fbcIframeHeight) {
  const iframeSrcVal = buildInpageIframe(socialAction, fbcIframeHeight).src;
  const hasFbcWrapper = document.querySelector(".fbc-wrapper");

  if (!hasFbcWrapper) {
    document.body.appendChild(injectIframeOntoPage(socialAction, fbcIframeHeight));
    positionIframe(fencePos);
    ["resize", "scroll"].forEach(function (evt) {
      if (document.querySelector(".fbc-wrapper")) {
        window.addEventListener(evt, () => {
          positionIframe(fencePos);
        });

      }
    });
    postMessageListeners(iframeSrcVal, target);
  }
  hasFbcWrapper.remove();
}