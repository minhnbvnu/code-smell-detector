function invokeAnnotation(type, x, y) {
  switch (type) {
    case 'erase':
      annotations.erase();
      break;

    case 'draw':
      annotations.draw(x,y);
      break;

    case 'click':
      annotations.click(x,y);
      break;
  }
}