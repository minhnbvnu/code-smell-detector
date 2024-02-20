function TextCanvas(strings, font, w, h, maxWidth, stringWidths, align, valign,
  scale) {
  this.strings = strings;
  this.font = font;
  this.width = w;
  this.height = h;
  this.maxWidth = maxWidth;
  this.stringWidths = stringWidths;
  this.align = align;
  this.valign = valign;
  this.scale = scale;
}