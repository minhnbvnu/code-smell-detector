function _CreateFramebuffer (gl, width, height, scaleMode, textureUnit)
{
    var framebuffer = gl.createFramebuffer();
    var depthStencilBuffer = gl.createRenderbuffer();
    var colorBuffer = null;
    var fbStatus = 0;

    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthStencilBuffer);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    colorBuffer = _CreateEmptyTexture(gl, width, height, scaleMode);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorBuffer, 0);
    fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(fbStatus !== gl.FRAMEBUFFER_COMPLETE)
    {
        console.error('Incomplete GL framebuffer. ', _fbErrors[fbStatus]);
    }
    framebuffer.width = width;
    framebuffer.height = height;
    framebuffer.targetTexture = colorBuffer;
    framebuffer.renderBuffer = depthStencilBuffer;
    return framebuffer;
}