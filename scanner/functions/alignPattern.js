function alignPattern(align) {
  switch (align) {
    case 'left':
    case undefined:
      return ':-';
    case 'right':
      return '-:';
    case 'center':
      return ':-:';
  }
}