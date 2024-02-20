function imagesLoadedAndLayout(elem) {
  return new Promise((resolve) => {
    imagesLoaded(elem)
        .on('progress', (imgLoad, e) => {
          e.img.parentNode.classList.add('demo--loaded');
          msnry.appended(e.img.parentNode);
          msnry.layout();
        })
        .on('done', () => {
          msnry.once('layoutComplete', () => {
            resolve();
          });
        });
  });
}