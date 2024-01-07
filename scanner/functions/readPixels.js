function readPixels(texture, face) {
    var rt = new pc.RenderTarget({ colorBuffer: texture, depth: false, face: face });
    var data = new Uint8ClampedArray(texture.width * texture.height * 4);
    var device = texture.device;
    device.setFramebuffer(rt.impl._glFrameBuffer);
    device.initRenderTarget(rt);
    device.gl.readPixels(0, 0, texture.width, texture.height, device.gl.RGBA, device.gl.UNSIGNED_BYTE, data);
    return data;
}