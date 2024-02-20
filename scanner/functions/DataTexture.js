function DataTexture(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding) {

  Texture.call(this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);

  this.image = { data: data, width: width, height: height };

  this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
  this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

  this.generateMipmaps = false;
  this.flipY = false;
  this.unpackAlignment = 1;

}