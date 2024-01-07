function drawTexture(device, texture, target, shader, rect, scissorRect) {
    Debug.assert(!device.isWebGPU, 'pc.drawTexture is not currently supported on WebGPU platform.');

    const useBlend = arguments[6];
    Debug.call(() => {
        if (useBlend !== undefined) {
            Debug.warnOnce('pc.drawTexture no longer accepts useBlend parameter, and blending state needs to be set up using GraphicsDevice.setBlendState.');
        }
    });

    shader = shader || device.getCopyShader();
    device.constantTexSource.setValue(texture);
    drawQuadWithShader(device, target, shader, rect, scissorRect);
}