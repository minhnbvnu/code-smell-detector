function listenImage(image, loadHandler, errorHandler) {
  const img = /** @type {HTMLImageElement} */ (image);
  let listening = true;
  let decoding = false;
  let loaded = false;

  const listenerKeys = [
    listenOnce(img, EventType.LOAD, function () {
      loaded = true;
      if (!decoding) {
        loadHandler();
      }
    }),
  ];

  if (img.src && IMAGE_DECODE) {
    decoding = true;
    img
      .decode()
      .then(function () {
        if (listening) {
          loadHandler();
        }
      })
      .catch(function (error) {
        if (listening) {
          if (loaded) {
            loadHandler();
          } else {
            errorHandler();
          }
        }
      });
  } else {
    listenerKeys.push(listenOnce(img, EventType.ERROR, errorHandler));
  }

  return function unlisten() {
    listening = false;
    listenerKeys.forEach(unlistenByKey);
  };
}