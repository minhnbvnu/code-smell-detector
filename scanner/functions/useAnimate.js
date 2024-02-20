function useAnimate(context, expanded, mounted, height) {
  const selector = '.van-collapse-item__wrapper';
  if (expanded) {
    context.animate(
      selector,
      [
        { height: 0, ease: 'ease-in-out', offset: 0 },
        { height: `${height}px`, ease: 'ease-in-out', offset: 1 },
        { height: `auto`, ease: 'ease-in-out', offset: 1 },
      ],
      mounted ? 300 : 0,
      () => {
        context.clearAnimation(selector);
      }
    );
    return;
  }
  context.animate(
    selector,
    [
      { height: `${height}px`, ease: 'ease-in-out', offset: 0 },
      { height: 0, ease: 'ease-in-out', offset: 1 },
    ],
    300,
    () => {
      context.clearAnimation(selector);
    }
  );
}