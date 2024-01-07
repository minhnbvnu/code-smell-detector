function quadWithShader(device, target, shader) {

    DebugGraphics.pushGpuMarker(device, "QuadWithShader");

    const oldRt = device.renderTarget;
    device.setRenderTarget(target);
    device.updateBegin();

    device.setCullMode(CULLFACE_NONE);
    device.setBlendState(BlendState.NOBLEND);
    device.setDepthState(DepthState.NODEPTH);
    device.setStencilState(null, null);

    device.setVertexBuffer(device.quadVertexBuffer, 0);
    device.setShader(shader);

    device.draw({
        type: PRIMITIVE_TRISTRIP,
        base: 0,
        count: 4,
        indexed: false
    });

    device.updateEnd();

    device.setRenderTarget(oldRt);
    device.updateBegin();

    DebugGraphics.popGpuMarker(device);
}