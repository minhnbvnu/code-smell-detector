function setImageSize(img, size) {
      var width, height;
      if (size) {
        width = img.style.width;
        height = img.style.height;
        if (width || height) {
          img.style.width = size.w + 'px';
          img.style.height = size.h + 'px';
          img.removeAttribute('data-mce-style');
        }
        width = img.width;
        height = img.height;
        if (width || height) {
          img.setAttribute('width', size.w);
          img.setAttribute('height', size.h);
        }
      }
    }