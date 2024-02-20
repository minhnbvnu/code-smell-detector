function isUnrendered(element) {
        // Check the absolute positioned container since the top level container is display: inline.
        var container = getState(element).container.childNodes[0];
        var style = window.getComputedStyle(container);
        return !style.width || style.width.indexOf('px') === -1; //Can only compute pixel value when rendered.
      }