function testTextureFloatHighPrecision(device) {
    if (!device.textureFloatRenderable)
        return false;

    const shader1 = new Shader(device, ShaderUtils.createDefinition(device, {
        name: 'ptest1',
        vertexCode: _fullScreenQuadVS,
        fragmentCode: _precisionTest1PS
    }));

    const shader2 = new Shader(device, ShaderUtils.createDefinition(device, {
        name: 'ptest2',
        vertexCode: _fullScreenQuadVS,
        fragmentCode: _precisionTest2PS
    }));

    const textureOptions = {
        format: PIXELFORMAT_RGBA32F,
        width: 1,
        height: 1,
        mipmaps: false,
        minFilter: FILTER_NEAREST,
        magFilter: FILTER_NEAREST,
        name: 'testFHP'
    };
    const tex1 = new Texture(device, textureOptions);
    const targ1 = new RenderTarget({
        colorBuffer: tex1,
        depth: false
    });
    quadWithShader(device, targ1, shader1);

    textureOptions.format = PIXELFORMAT_RGBA8;
    const tex2 = new Texture(device, textureOptions);
    const targ2 = new RenderTarget({
        colorBuffer: tex2,
        depth: false
    });
    device.constantTexSource.setValue(tex1);
    quadWithShader(device, targ2, shader2);

    const prevFramebuffer = device.activeFramebuffer;
    device.setFramebuffer(targ2.impl._glFrameBuffer);

    const pixels = new Uint8Array(4);
    device.readPixels(0, 0, 1, 1, pixels);

    device.setFramebuffer(prevFramebuffer);

    const x = pixels[0] / 255;
    const y = pixels[1] / 255;
    const z = pixels[2] / 255;
    const w = pixels[3] / 255;
    const f = x / (256 * 256 * 256) + y / (256 * 256) + z / 256 + w;

    tex1.destroy();
    targ1.destroy();
    tex2.destroy();
    targ2.destroy();
    shader1.destroy();
    shader2.destroy();

    return f === 0;
}