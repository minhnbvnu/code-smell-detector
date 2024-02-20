function MathboxAnimation(element, opts1) {
      var base, k;
      this.opts = opts1;
      this.opts.target = element;
      if ((base = this.opts).to == null) {
        base.to = Math.max.apply(null, (function() {
          var results;
          results = [];
          for (k in this.opts.script) {
            results.push(k);
          }
          return results;
        }).call(this));
      }
      MathboxAnimation.__super__.constructor.apply(this, arguments);
    }