function Simplex3D(seed) {
    if (seed == null) {
      seed = 0;
    }
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }