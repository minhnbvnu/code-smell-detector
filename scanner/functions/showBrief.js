function showBrief()
  {
    if (ttElement.style.visibility !== 'visible') {
      ttElement.style.visibility = 'visible';

      updatePos();

      applyAnimationClass(elBox, ttModel.animateFunction + "-from",
        ttModel.animateFunction + "-to");
    }

    return this;
  }