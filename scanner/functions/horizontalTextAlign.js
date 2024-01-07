function horizontalTextAlign(text, align) {
  if (align === 'start') {
    align = rtlRegEx.test(text) ? 'right' : 'left';
  } else if (align === 'end') {
    align = rtlRegEx.test(text) ? 'left' : 'right';
  }
  return TEXT_ALIGN[align];
}