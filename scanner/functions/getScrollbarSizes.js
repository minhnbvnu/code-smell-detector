function getScrollbarSizes() {
      var width = 500;
      var height = 500;

      var child = document.createElement('div');
      child.style.cssText =
        'position: absolute; width: ' +
        width * 2 +
        'px; height: ' +
        height * 2 +
        'px; visibility: hidden; margin: 0; padding: 0;';

      var container = document.createElement('div');
      container.style.cssText =
        'position: absolute; width: ' +
        width +
        'px; height: ' +
        height +
        'px; overflow: scroll; visibility: none; top: ' +
        -width * 3 +
        'px; left: ' +
        -height * 3 +
        'px; visibility: hidden; margin: 0; padding: 0;';

      container.appendChild(child);

      document.body.insertBefore(container, document.body.firstChild);

      var widthSize = width - container.clientWidth;
      var heightSize = height - container.clientHeight;

      document.body.removeChild(container);

      return {
        width: widthSize,
        height: heightSize,
      };
    }