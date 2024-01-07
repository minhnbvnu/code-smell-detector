function pan(view, delta, duration) {
  const currentCenter = view.getCenterInternal();
  if (currentCenter) {
    const center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
    view.animateInternal({
      duration: duration !== undefined ? duration : 250,
      easing: linear,
      center: view.getConstrainedCenter(center),
    });
  }
}