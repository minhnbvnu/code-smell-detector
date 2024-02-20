function PlaceHolder(el, texts, options) {
    this.el = el;
    this.texts = texts;
    options = options || {};
    this.options = extend(defaults, options);
    // Translate deprecated `startOnFocus` option to new ones.
    if (!this.options.startOnFocus) {
      // TODO: add deprecation message
      console.warn(
        'Superplaceholder.js: `startOnFocus` option has been deprecated. Please use `onFocusAction`, `onBlurAction` and `autoStart`'
      );

      this.options.autoStart = true;
      this.options.onFocusAction = Actions.NOTHING;
      this.options.onBlurAction = Actions.NOTHING;
    }
    this.timeouts = [];
    this.isPlaying = false;

    var temp, randomIndex;
    if (this.options.shuffle) {
      for (var i = this.texts.length; i--; ) {
        randomIndex = ~~(Math.random() * i);
        temp = this.texts[randomIndex];
        this.texts[randomIndex] = this.texts[i];
        this.texts[i] = temp;
      }
    }

    this.begin();
  }