function Transformable() {
    var fn, len1, method, o, ref;
    this.m = new seen.Matrix();
    this.baked = IDENTITY;
    ref = ['scale', 'translate', 'rotx', 'roty', 'rotz', 'matrix', 'reset', 'bake'];
    fn = (function(_this) {
      return function(method) {
        return _this[method] = function() {
          var ref1;
          (ref1 = this.m[method]).call.apply(ref1, [this.m].concat(slice.call(arguments)));
          return this;
        };
      };
    })(this);
    for (o = 0, len1 = ref.length; o < len1; o++) {
      method = ref[o];
      fn(method);
    }
  }