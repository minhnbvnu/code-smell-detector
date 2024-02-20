function ScrollGestureOptions(opt_options) {
    if (opt_options) {
      this.element_ = opt_options.element;
      this.left_start_percentage_ = opt_options.left_start_percentage;
      this.top_start_percentage_ = opt_options.top_start_percentage;
      this.direction_ = opt_options.direction;
      this.speed_ = opt_options.speed;
      this.gesture_source_type_ = opt_options.gesture_source_type;
    } else {
      this.element_ = document.body;
      this.left_start_percentage_ = 0.5;
      this.top_start_percentage_ = 0.5;
      this.direction_ = 'down';
      this.speed_ = 800;
      this.gesture_source_type_ = chrome.gpuBenchmarking.DEFAULT_INPUT;
    }
  }