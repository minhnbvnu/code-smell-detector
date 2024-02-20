function setProgress({ progressNo = 0, total = 0, progress = 0, text = '' }) {
    if (!dialog.$el) {
      // maybe closed
      return;
    }
    // prepare progressbar
    const progressbars = dialog.$el.find('.progressbar-item');
    const progressbar = ctx.$$(progressbars[progressNo]);
    // setProgress
    const _progress = total > 0 ? parseInt((progress * 100) / total) : progress;
    app.progressbar.set(progressbar.find('.progressbar'), _progress);
    // set text
    const _text = total > 0 ? `(${progress + 1}/${total}) ${text}` : text;
    const $textEl = progressbar.find('.progressbar-text');
    $textEl.text(_text);
  }