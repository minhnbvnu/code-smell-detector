function fetchResource(resource) {
    return new Promise(function (resolve, reject) {
      const isImage = /\.(png|jpe?g|gif|tiff?|svg|kmz)$/.test(resource);
      if (isImage) {
        resolve ({
          isBinary: true,
          content: new URL(resource, window.location.href).href
        });
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', resource);
        xhr.responseType = 'text';
        xhr.addEventListener('load', function () {
          resolve ({
            content: xhr.response
          });
        });
        xhr.addEventListener('error', reject);
        xhr.send();
      }
    })
  }