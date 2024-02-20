function Codec(codec, encoding) {
  this.codec = codec;
  this.enc = codec.enc || encoding;
  this.bomAware = codec.bomAware || false;
}