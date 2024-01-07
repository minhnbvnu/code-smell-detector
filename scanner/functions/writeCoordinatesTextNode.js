function writeCoordinatesTextNode(node, coordinates, objectStack) {
  const context = objectStack[objectStack.length - 1];

  const layout = context['layout'];
  const stride = context['stride'];

  let dimension;
  if (layout == 'XY' || layout == 'XYM') {
    dimension = 2;
  } else if (layout == 'XYZ' || layout == 'XYZM') {
    dimension = 3;
  } else {
    throw new Error('Invalid geometry layout');
  }

  const ii = coordinates.length;
  let text = '';
  if (ii > 0) {
    text += coordinates[0];
    for (let d = 1; d < dimension; ++d) {
      text += ',' + coordinates[d];
    }
    for (let i = stride; i < ii; i += stride) {
      text += ' ' + coordinates[i];
      for (let d = 1; d < dimension; ++d) {
        text += ',' + coordinates[i + d];
      }
    }
  }
  writeStringTextNode(node, text);
}