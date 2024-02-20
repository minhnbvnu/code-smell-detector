function WebGLRenderTarget(width, height, options) {

  this.width = width;
  this.height = height;

  this.scissor = new Vector4(0, 0, width, height);
  this.scissorTest = false;

  this.viewport = new Vector4(0, 0, width, height);

  options = options || {};

  if (options.minFilter === undefined) options.minFilter = LinearFilter;

  this.texture = new Texture(undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);

  this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : true;

  this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
  this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
  this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;

}