function checkRenderTarget (renderTarget, colorSpace) {
    const texture = renderTarget.texture;
    assert.equal(texture.colorSpace, colorSpace);
    assert.equal(texture.minFilter, THREE.LinearFilter);
    assert.equal(texture.magFilter, THREE.LinearFilter);
    assert.equal(texture.wrapS, THREE.ClampToEdgeWrapping);
    assert.equal(texture.wrapT, THREE.ClampToEdgeWrapping);
    assert.equal(texture.format, THREE.RGBAFormat);
    assert.equal(texture.type, THREE.UnsignedByteType);
  }