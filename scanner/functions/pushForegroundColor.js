function pushForegroundColor(stack, color) {
  return pushTag(stack, 'span', 'color:' + color);
}