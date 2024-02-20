function Slideshow(controller1) {
      var cls, ref;
      this.controller = controller1;
      this.goToSlide = bind(this.goToSlide, this);
      this.updateUI = bind(this.updateUI, this);
      this.slides = [];
      this.states = [this.controller.state.copy()];
      this.currentSlideNum = 0;
      this.playing = false;
      this.combining = [];
      cls = ".slideshow." + this.controller.name;
      this.prevButton = document.querySelector(cls + " .prev-button");
      this.reloadButton = document.querySelector(cls + " .reload-button");
      this.nextButton = document.querySelector(cls + " .next-button");
      this.pageCounter = document.querySelector(cls + " .pages");
      this.captionDiv = document.querySelector(cls + " .caption");
      this.states[0].caption = this.controller.state.caption = (ref = this.captionDiv) != null ? ref.innerHTML : void 0;
      this.prevButton.onclick = (function(_this) {
        return function() {
          return _this.prevSlide();
        };
      })(this);
      this.nextButton.onclick = (function(_this) {
        return function() {
          return _this.nextSlide();
        };
      })(this);
      this.reloadButton.onclick = (function(_this) {
        return function() {
          return _this.reloadSlide();
        };
      })(this);
      this.updateUI();
    }