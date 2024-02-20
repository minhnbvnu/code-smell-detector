function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    body.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(body, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }