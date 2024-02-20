function CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {

  images = images !== undefined ? images : [];
  mapping = mapping !== undefined ? mapping : CubeReflectionMapping;

  Texture.call(this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);

  this.flipY = false;

}