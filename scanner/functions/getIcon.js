function getIcon(iconName) {
    var icon = iconCache[iconName];
    if (!icon) {
      icon = new Style({image: new Icon({
        src: 'https://cdn.jsdelivr.net/npm/@mapbox/maki@4.0.0/icons/' + iconName + '-15.svg',
        imgSize: [15, 15],
        crossOrigin: 'anonymous'
      })});
      iconCache[iconName] = icon;
    }
    return icon;
  }