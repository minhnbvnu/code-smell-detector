function generateTranslate(x, y, z, scale) {
    return 'translate' + (has3d ? '3d(' : '(') + x + 'px,' + y + (has3d ? 'px,' + z + 'px)' : 'px)') + 'scale(' + scale + ')';
  }