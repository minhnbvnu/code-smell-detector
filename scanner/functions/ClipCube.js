function ClipCube(view1, opts1) {
      var color, draw, fragment, hilite, material, pass, range, ref, ref1, ref2, ref3, ref4, ref5, ref6, shaded;
      this.view = view1;
      this.opts = opts1;
      if (this.opts == null) {
        this.opts = {};
      }
      range = (ref = this.opts.range) != null ? ref : 1.0;
      pass = (ref1 = this.opts.pass) != null ? ref1 : "world";
      hilite = (ref2 = this.opts.hilite) != null ? ref2 : true;
      draw = (ref3 = this.opts.draw) != null ? ref3 : false;
      shaded = (ref4 = this.opts.shaded) != null ? ref4 : false;
      this.three = this.view._context.api.three;
      this.camera = this.view._context.api.select("camera")[0].controller.camera;
      if (draw) {
        material = (ref5 = this.opts.material) != null ? ref5 : new THREE.MeshBasicMaterial();
        if (this.opts.color != null) {
          this.opts.color = new Color(this.opts.color);
        }
        color = (ref6 = this.opts.color) != null ? ref6 : new Color(.7, .7, .7);
        this.mesh = (function(_this) {
          return function() {
            var cube, geo, mesh;
            geo = new THREE.BoxGeometry(2, 2, 2);
            mesh = new THREE.Mesh(geo, material);
            cube = new THREE.BoxHelper(mesh);
            cube.material.color = color.three();
            _this.three.scene.add(cube);
            return mesh;
          };
        })(this)();
      }
      this.uniforms = {
        range: {
          type: 'f',
          value: range
        },
        hilite: {
          type: 'i',
          value: hilite ? 1 : 0
        }
      };
      if (this.opts.fragmentShader != null) {
        fragment = this.opts.fragmentShader;
      } else if (shaded) {
        fragment = shadeFragment + "\n" + clipFragment;
      } else {
        fragment = noShadeFragment + "\n" + clipFragment;
      }
      this.clipped = this.view.shader({
        code: clipShader
      }).vertex({
        pass: pass
      }).shader({
        code: fragment,
        uniforms: this.uniforms
      }).fragment();
    }