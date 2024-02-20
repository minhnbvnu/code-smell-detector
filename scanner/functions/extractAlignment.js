function extractAlignment(alignment) {
  switch (alignment) {
    case 'right':
      return 1;
    case 'center':
      return 2;
    default:
      return 0;
  }
}