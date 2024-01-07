function getFriendlyTag(tag) {
  switch (tag) {
    case 0:
      return '[indeterminate]';
    case 1:
      return '[fn]';
    case 2:
      return '[class]';
    case 3:
      return '[root]';
    case 4:
      return '[portal]';
    case 5:
      return '[host]';
    case 6:
      return '[text]';
    case 7:
      return '[coroutine]';
    case 8:
      return '[handler]';
    case 9:
      return '[yield]';
    case 10:
      return '[frag]';
    default:
      throw new Error('Unknown tag.');
  }
}