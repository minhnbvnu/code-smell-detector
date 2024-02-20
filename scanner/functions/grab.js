function grab (e) {
    var item = e.target;
    var ignore = (e.which !== 0 && e.which !== 1) || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    if (start(item) !== true) {
      return;
    }

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;
    _clientX = getCoord('clientX', e);
    _clientY = getCoord('clientY', e);

    if (typeof o.delay === 'number') {
      _renderTimer = setTimeout(renderMirrorAndDrag, o.delay);
    } else {
      renderMirrorAndDrag();
    }
    e.preventDefault();
  }