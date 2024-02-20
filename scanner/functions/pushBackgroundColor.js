function pushBackgroundColor(stack, color) {
  return pushTag(stack, 'span', 'background-color:' + color);
}