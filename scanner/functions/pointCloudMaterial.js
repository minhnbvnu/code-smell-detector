function pointCloudMaterial(opts) {
      return new THREE.ShaderMaterial(extend({
          uniforms:       uniforms(opts),
          attributes:     {},
          vertexShader:   d3.select('#vertexshader').node().textContent,
          fragmentShader: d3.select('#fragmentshader').node().textContent,
          transparent:    true,
          setDepthTest: false
      }, opts || {}))
    }