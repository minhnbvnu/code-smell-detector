function BmpDecoder(buffer, is_with_alpha) {
  this.pos = 0;
  this.buffer = buffer;
  this.datav = new DataView(buffer.buffer);
  this.is_with_alpha = !!is_with_alpha;
  this.bottom_up = true;
  this.flag =
    String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]);
  this.pos += 2;
  if (["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag) === -1)
    throw new Error("Invalid BMP File");
  this.parseHeader();
  this.parseBGR();
}