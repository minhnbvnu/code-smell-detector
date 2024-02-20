function prepareProgressbars(length) {
    if (!dialog.$el) {
      // maybe closed
      return;
    }
    const progressbars = dialog.$el.find('.progressbar-item');
    if (progressbars.length > length) {
      // remove
      for (let i = progressbars.length - 1; i > length - 1; i--) {
        progressbars[i].remove();
      }
    } else if (progressbars.length < length) {
      const container = dialog.$el.find('.progressbar-container');
      for (let i = 0; i < length - progressbars.length; i++) {
        const progressbar = ctx.$$(`
                <div class="progressbar-item">
                  <div class="progressbar">
                    <span></span>
                  </div>
                  <div class="progressbar-text"></div>
                <div>
        `);
        container.append(progressbar);
      }
    }
  }