function FadeAnimation(element, script) {
      var k, opts, script2, v;
      script2 = {};
      for (k in script) {
        v = script[k];
        script2[k] = {
          props: {
            opacity: v
          }
        };
      }
      opts = {
        script: script2
      };
      opts.ease = 'linear';
      FadeAnimation.__super__.constructor.call(this, element, opts);
    }