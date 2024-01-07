function drawFullscreenQuad(device, target, vertexBuffer, shader, rect) {

    Debug.deprecated(`pc.drawFullscreenQuad is deprecated. When used as part of PostEffect, use PostEffect#drawQuad instead.`);

    // convert rect in normalized space to viewport in pixel space
    let viewport;
    if (rect) {
        const w = target ? target.width : device.width;
        const h = target ? target.height : device.height;
        viewport = _viewport.set(rect.x * w, rect.y * h, rect.z * w, rect.w * h);
    }

    drawQuadWithShader(device, target, shader, viewport);
}