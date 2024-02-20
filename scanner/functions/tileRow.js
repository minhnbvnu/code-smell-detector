function tileRow(selector) {
  let marginTop = getStyle(selector, 'margin-top');

  switch (marginTop) {
    case '0px':
      return 1;
    case '150.25px':
      return 2;
    case '300.5px':
      return 3;
    default:
      return 'grid sizing wrong: grid not ready yet?';
  }
}