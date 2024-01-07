function getIconName(location, visible) {
  switch (location) {
    case 'right':
      return visible ? 'icon-chevron-right' : 'icon-chevron-left';
    case 'bottom':
      return visible ? 'icon-chevron-down' : 'icon-chevron-up';
    case 'left':
      return visible ? 'icon-chevron-left' : 'icon-chevron-right';
    default:
      throw new Error(`Invalid location: ${location}`);
  }
}