function setContentAnimate(context, expanded, mounted) {
  getRect(context, '.van-collapse-item__content')
    .then((rect) => rect.height)
    .then((height) => {
      canIUseAnimate()
        ? useAnimate(context, expanded, mounted, height)
        : useAnimation(context, expanded, mounted, height);
    });
}