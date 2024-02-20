function getRootRect(el) {
  let rootRect;

  if (el !== window) {
    rootRect = el.getBoundingClientRect();
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    const html = document.documentElement;
    const body = document.body;

    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }

  return rootRect;
}