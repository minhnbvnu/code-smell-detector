function updateVideoSrc(el) {
      var src = el.getAttribute('data-src');
      if (src && !el.hasAttribute('src')) {
        el.setAttribute('src', src);
      }
    }