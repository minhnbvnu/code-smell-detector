function handleEffects(item) {
    var name = '';
    if (item.opacity && item.opacity < 100) {
      name += '-opacity' + item.opacity;
      item.opacity = 100;
    }
    if (item.blendingMode == BlendModes.MULTIPLY) {
      item.blendingMode = BlendModes.NORMAL;
      name += '-multiply';
    }
    if (name) {
      if (item.name) {
        name += '--' + item.name;
      }
      item.name = 'Z-' + name;
    }
  }