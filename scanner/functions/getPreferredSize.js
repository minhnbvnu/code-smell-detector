function getPreferredSize(item, location) {
  switch (location) {
    case 'left':
    case 'right':
      return typeof item.getPreferredWidth === 'function'
        ? item.getPreferredWidth()
        : null;
    default:
      return typeof item.getPreferredHeight === 'function'
        ? item.getPreferredHeight()
        : null;
  }
}