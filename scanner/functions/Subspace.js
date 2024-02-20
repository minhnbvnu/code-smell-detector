function Subspace(opts1) {
      var i, ref, ref1, ref2, u;
      this.opts = opts1;
      this.updateDim = bind(this.updateDim, this);
      this.setVisibility = bind(this.setVisibility, this);
      this.draw = bind(this.draw, this);
      this.contains = bind(this.contains, this);
      this.complementFull = bind(this.complementFull, this);
      this.complement = bind(this.complement, this);
      this.project = bind(this.project, this);
      this.update = bind(this.update, this);
      this.setVecs = bind(this.setVecs, this);
      this.onDimChange = (ref = this.opts.onDimChange) != null ? ref : function() {};
      this.ortho = [new THREE.Vector3(), new THREE.Vector3()];
      this.zeroThreshold = (ref1 = this.opts.zeroThreshold) != null ? ref1 : 0.00001;
      this.numVecs = this.opts.vectors.length;
      this.vectors = [];
      for (i = u = 0, ref2 = this.numVecs; 0 <= ref2 ? u < ref2 : u > ref2; i = 0 <= ref2 ? ++u : --u) {
        this.vectors[i] = makeTvec(this.opts.vectors[i]);
      }
      this.mesh = this.opts.mesh;
      this.tmpVec1 = new THREE.Vector3();
      this.tmpVec2 = new THREE.Vector3();
      this.tmpVec3 = new THREE.Vector3();
      this.drawn = false;
      this.dim = -1;
      this.update();
    }