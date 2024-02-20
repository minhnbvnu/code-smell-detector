function TextSet(ctxt, font, colour, strings, padx, pady, shadowColour,
  shadowBlur, shadowOffsets, maxWidth, widths, align) {
  var xo = padx + (shadowBlur || 0) + 
    (shadowOffsets.length && shadowOffsets[0] < 0 ? abs(shadowOffsets[0]) : 0),
    yo = pady + (shadowBlur || 0) + 
    (shadowOffsets.length && shadowOffsets[1] < 0 ? abs(shadowOffsets[1]) : 0), i, xc;
  ctxt.font = font;
  ctxt.textBaseline = 'top';
  ctxt.fillStyle = colour;
  shadowColour && (ctxt.shadowColor = shadowColour);
  shadowBlur && (ctxt.shadowBlur = shadowBlur);
  shadowOffsets.length && (ctxt.shadowOffsetX = shadowOffsets[0],
    ctxt.shadowOffsetY = shadowOffsets[1]);
  for(i = 0; i < strings.length; ++i) {
    xc = 0;
    if(widths) {
      if('right' == align) {
        xc = maxWidth - widths[i];
      } else if('centre' == align) {
        xc = (maxWidth - widths[i]) / 2;
      }
    }
    ctxt.fillText(strings[i], xo + xc, yo);
    yo += parseInt(font);
  }
}