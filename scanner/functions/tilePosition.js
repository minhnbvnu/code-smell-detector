function tilePosition(selector) {
  let left = getStyle(selector, 'left');

  switch (left) {
    case '0px':
      return 1;
    case '50px':
      return 2;
    case '100px':
      return 3;
    case '150px':
      return 4;
    default:
      return 'grid sizing wrong: grid not ready yet?';
  }
}