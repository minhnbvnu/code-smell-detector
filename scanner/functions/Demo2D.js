function Demo2D(opts, callback) {
      var base, base1, base2, base3, base4, base5, base6, base7, base8, ortho, ref, ref1, vertical;
      if (opts == null) {
        opts = {};
      }
      if (opts.dims == null) {
        opts.dims = 2;
      }
      if (opts.mathbox == null) {
        opts.mathbox = {};
      }
      if ((base = opts.mathbox).plugins == null) {
        base.plugins = ['core'];
      }
      ortho = (ref = opts.ortho) != null ? ref : 10000;
      if ((base1 = opts.mathbox).camera == null) {
        base1.camera = {};
      }
      if ((base2 = opts.mathbox.camera).near == null) {
        base2.near = ortho / 4;
      }
      if ((base3 = opts.mathbox.camera).far == null) {
        base3.far = ortho * 4;
      }
      if (opts.camera == null) {
        opts.camera = {};
      }
      if ((base4 = opts.camera).proxy == null) {
        base4.proxy = false;
      }
      if ((base5 = opts.camera).position == null) {
        base5.position = [0, 0, ortho];
      }
      if ((base6 = opts.camera).lookAt == null) {
        base6.lookAt = [0, 0, 0];
      }
      if ((base7 = opts.camera).up == null) {
        base7.up = [1, 0, 0];
      }
      vertical = (ref1 = opts.vertical) != null ? ref1 : 1.1;
      if ((base8 = opts.camera).fov == null) {
        base8.fov = Math.atan(vertical / ortho) * 360 / π;
      }
      if (opts.focusDist == null) {
        opts.focusDist = ortho / 1.5;
      }
      Demo2D.__super__.constructor.call(this, opts, callback);
    }