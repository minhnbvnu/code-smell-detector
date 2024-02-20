function leave(ctrlA, ctrlB, step) {
      if (!ctrlA || !ctrlB) return;
      var titleX = (-(ctrlA.titleTextX() - ctrlB.backButtonTextLeft()) - (ctrlA.titleLeftRight())) * step;
      setStyles(ctrlA, 1 - step, titleX, 0);
    }