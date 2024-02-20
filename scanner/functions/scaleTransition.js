function scaleTransition(config) {
  // eslint-disable-next-line
  console.warn(
    `[MagicMove] Scale transition has been deprecated and will be removed in the near future, use the default 'move' transition instead`
  );
  return moveTransition(config);
}