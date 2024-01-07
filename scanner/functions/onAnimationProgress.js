function onAnimationProgress(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  callCallback(animationOptions && animationOptions.onProgress, [context], chart);
}