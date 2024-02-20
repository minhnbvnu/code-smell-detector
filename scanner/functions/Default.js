function Default(renderer, params = {}) {

  const w = renderer.getSize().width;
  const h = renderer.getSize().height;

  const colorFBO = new THREE.WebGLRenderTarget(w, h, {
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    minFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: true
  });

  const shader = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(w, h) },
      vignetteBoost: { value: params.vignetteBoost || .5 },
      vignetteReduction: { value: params.vignetteReduction || .5 },
      inputTexture: { value: colorFBO.texture },
    },
    vertexShader: orthoVertexShader,
    fragmentShader: fragmentShader,
  });
  const pass = new ShaderPass(renderer, shader, w, h, THREE.RGBAFormat, THREE.UnsignedByteType, THREE.LinearFilter, THREE.LinearFilter, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping);

  function render(scene, camera) {
    renderer.render(scene, camera, colorFBO);
    pass.shader.uniforms.inputTexture.value = colorFBO.texture;
    pass.render(true);
  }

  return {
    render
  }
}