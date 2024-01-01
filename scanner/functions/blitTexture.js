function blitTexture (gl, texture, subImage, textureEl) {
  var xrReadFramebuffer = gl.createFramebuffer();
  var x1offset = subImage.viewport.x;
  var y1offset = subImage.viewport.y;
  var x2offset = subImage.viewport.x + subImage.viewport.width;
  var y2offset = subImage.viewport.y + subImage.viewport.height;

  // Update video texture.
  if (textureEl.tagName === 'VIDEO') {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, textureEl.width, textureEl.height, gl.RGB, gl.UNSIGNED_BYTE, textureEl);
  }

  // Bind texture to read framebuffer.
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, xrReadFramebuffer);
  gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  // Blit into layer buffer.
  gl.readBuffer(gl.COLOR_ATTACHMENT0);
  gl.blitFramebuffer(0, 0, textureEl.width, textureEl.height, x1offset, y1offset, x2offset, y2offset, gl.COLOR_BUFFER_BIT, gl.NEAREST);

  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
  gl.deleteFramebuffer(xrReadFramebuffer);
}