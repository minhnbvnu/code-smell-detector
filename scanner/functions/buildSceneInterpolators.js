function buildSceneInterpolators(startStyles, endStyles) {
  return {
    Title: buildStyleInterpolator({
      opacity: {
        type: 'linear',
        from: startStyles.Title.opacity,
        to: endStyles.Title.opacity,
        min: 0,
        max: 1,
      },
      left: {
        type: 'linear',
        from: startStyles.Title.left,
        to: endStyles.Title.left,
        min: 0,
        max: 1,
        extrapolate: true,
      },
    }),
    LeftButton: buildStyleInterpolator({
      opacity: {
        type: 'linear',
        from: startStyles.LeftButton.opacity,
        to: endStyles.LeftButton.opacity,
        min: 0,
        max: 1,
        round: opacityRatio,
      },
      left: {
        type: 'linear',
        from: startStyles.LeftButton.left,
        to: endStyles.LeftButton.left,
        min: 0,
        max: 1,
      },
    }),
    RightButton: buildStyleInterpolator({
      opacity: {
        type: 'linear',
        from: startStyles.RightButton.opacity,
        to: endStyles.RightButton.opacity,
        min: 0,
        max: 1,
        round: opacityRatio,
      },
      left: {
        type: 'linear',
        from: startStyles.RightButton.left,
        to: endStyles.RightButton.left,
        min: 0,
        max: 1,
        extrapolate: true,
      },
    }),
  };
}