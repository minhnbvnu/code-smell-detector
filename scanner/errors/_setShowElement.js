function _setShowElement(targetElement, helperLayer) {
    // we need to add this show element class to the parent of SVG elements
    // because the SVG elements can't have independent z-index
    if (targetElement.element instanceof SVGElement) {
      var parentElm = targetElement.element.parentNode;

      while (targetElement.element.parentNode != null) {
        if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

        if (parentElm.tagName.toLowerCase() === 'svg') {
          _setClass(parentElm, 'introjs-showElement introjs-relativePosition');
        }

        parentElm = parentElm.parentNode;
      }
    }

    _setClass(targetElement.element, 'introjs-showElement');

    var currentElementPosition = _getPropValue(targetElement.element, 'position');
    if (currentElementPosition !== 'absolute' &&
        currentElementPosition !== 'relative' &&
        currentElementPosition !== 'fixed') {
      //change to new intro item
      //targetElement.element.className += ' introjs-relativePosition';
      _setClass(targetElement.element, 'introjs-relativePosition')
    }

    var transformString = '';
    var parentElm = targetElement.element.parentNode;
    while (parentElm != null) {
      if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

      //fix The Stacking Context problem.
      //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
      var zIndex = _getPropValue(parentElm, 'z-index');
      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));
      var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');
      if (/[0-9]+/.test(zIndex) || opacity < 1 || (transform !== 'none' && transform !== undefined)) {
        parentElm.className += ' introjs-fixParent';
        transformString     += ' ' + parentElm.style.transform;
      }

      parentElm = parentElm.parentNode;
    }

    // Since we cannot rely on z-index stacking, let's clone the element and put it above the helperLayer
    if(transformString.trim() != '') {
      while (helperLayer.lastChild) {
        helperLayer.removeChild(helperLayer.lastChild);
      };

      var clone = targetElement.element.cloneNode(true);

      clone.style.cssText   = document.defaultView.getComputedStyle(targetElement.element).cssText;
      clone.className      += ' introjs-fixElement';
      clone.style.transform = transformString;

      helperLayer.appendChild(clone);
    }
  }