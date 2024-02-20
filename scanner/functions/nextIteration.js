function nextIteration(err) {
      if (err) return onFinish(err);
      iterator();
    }