function setup () {
      var gl = el.renderer.getContext();
      if (!gl) { return; }
      self.cubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
      self.material = new THREE.RawShaderMaterial({
        uniforms: {map: {type: 't', value: null}},
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        side: THREE.DoubleSide
      });
      self.quad = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        self.material
      );
      self.quad.visible = false;
      self.camera = new THREE.OrthographicCamera(-1 / 2, 1 / 2, 1 / 2, -1 / 2, -10000, 10000);
      self.canvas = document.createElement('canvas');
      self.ctx = self.canvas.getContext('2d');
      el.object3D.add(self.quad);
      self.onKeyDown = self.onKeyDown.bind(self);
    }