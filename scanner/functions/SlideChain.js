function SlideChain(slides) {
      var callback, j, k, l, len, len1, ref, ref1, ref2, slide, v;
      this.slides = slides;
      this.fastForward = bind(this.fastForward, this);
      this.stop = bind(this.stop, this);
      this.start = bind(this.start, this);
      this.playSlide = bind(this.playSlide, this);
      SlideChain.__super__.constructor.apply(this, arguments);
      this.slideNum = -1;
      callback = (function(_this) {
        return function() {
          if (_this.slideNum + 1 < _this.slides.length) {
            return _this.playSlide(_this.slideNum + 1);
          } else {
            _this.slideNum = -1;
            return _this.done();
          }
        };
      })(this);
      ref = this.slides;
      for (j = 0, len = ref.length; j < len; j++) {
        slide = ref[j];
        slide.on('done', callback);
      }
      ref1 = this.slides;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        slide = ref1[l];
        ref2 = slide.data;
        for (k in ref2) {
          v = ref2[k];
          this.data[k] = v;
        }
      }
    }