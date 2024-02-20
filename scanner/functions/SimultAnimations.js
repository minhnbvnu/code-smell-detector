function SimultAnimations(children) {
      var child, j, len, ref;
      this.children = children;
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.on('done', (function(_this) {
          return function() {
            return _this.done();
          };
        })(this));
      }
      SimultAnimations.__super__.constructor.apply(this, arguments);
    }