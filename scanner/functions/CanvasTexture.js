function CanvasTexture(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {

  Texture.call(this, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);

  this.needsUpdate = true;

}