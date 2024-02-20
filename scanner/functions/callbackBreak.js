function callbackBreak() {
    ctx.dialog
      .confirm()
      .then(() => {
        return ctx.$api
          .post('/a/progress/progress/abort', {
            progressId,
          })
          .then(() => {});
      })
      .catch(() => {
        // need not
        // dialog.open();
      });
  }