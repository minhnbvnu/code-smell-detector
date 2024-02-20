function Post(renderer, params = {}) {

  const w = renderer.getSize().width;
  const h = renderer.getSize().height;

  const colorFBO = getFBO(w, h);

  const antialiasShader = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(w, h) },
      inputTexture: { value: colorFBO.texture },
      minLevel: { value: params.minLevel || 0 },
      maxLevel: { value: params.maxLevel || .8 },
      gamma: { value: params.gamma || 1.4 }
    },
    vertexShader: orthoVertexShader,
    fragmentShader: antialiasFragmentShader,
  });
  const antialiasPass = new ShaderPass(renderer, antialiasShader, w, h, THREE.RGBAFormat, THREE.UnsignedByteType, THREE.LinearFilter, THREE.LinearFilter, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);

  const rgbShader = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(w, h) },
      inputTexture: { value: antialiasPass.fbo.texture },
    },
    vertexShader: orthoVertexShader,
    fragmentShader: rgbFragmentShader,
  });
  const rgbPass = new ShaderPass(renderer, rgbShader, w, h, THREE.RGBAFormat, THREE.UnsignedByteType, THREE.LinearFilter, THREE.LinearFilter, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);

  function render(scene, camera) {
    renderer.render(scene, camera, colorFBO);
    antialiasPass.render();
    rgbPass.render(true);
  }

  return {
    render
  }
}