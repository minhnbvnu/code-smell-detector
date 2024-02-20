function fetchImagesBase64(images) {

  var chain = new Promise(function(resolve) {
    resolve();
  });

  _(images).map(function(image) {
    chain = chain.then(
      function() {
        // eslint-disable-next-line no-console
        console.log('    fetching ' + white(image.url));
        return fetchImageBase64(image.url).then(function(base64) {
          // eslint-disable-next-line no-console
          console.log(green('    fetched ') + Math.floor(base64.length / 1024) + white('kb'));
          image.base64 = base64;
        });
      }
    );
  });

  return chain.then(function() {
    return images;
  });
}