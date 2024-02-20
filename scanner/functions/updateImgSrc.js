function updateImgSrc(img) {
      var src = img.getAttribute('data-src');
      if (src && img.getAttribute('src') != src) {
        img.setAttribute('src', src);
      }
    }