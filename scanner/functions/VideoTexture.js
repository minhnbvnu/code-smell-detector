function VideoTexture(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {

  Texture.call(this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

  this.format = format !== undefined ? format : RGBFormat;

  this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
  this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;

  this.generateMipmaps = false;

}