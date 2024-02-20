function generateTriangleStyles(position, size) {
  // Generate borderWidth & borderColor rules
  const positions = [POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT];
  // Set border width to zero for opposite position
  const oppositePosition = getOppositePosition(position);
  const style = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  for (const p of positions) {
    const key = capitalize(p);
    const width = p === oppositePosition ? 0 : size;
    const color = p === position ? undefined : 'transparent';
    style[`border${key}Width`] = width;
    style[`border${key}Color`] = color;
  }

  return style;
}