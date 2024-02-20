function onEnd() {
      var hit = list.filter(check)[0];
      next(hit && new Error(hit));
    }