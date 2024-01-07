function onAnimationsComplete(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;

  chart.notifyPlugins('afterRender');
  callCallback(animationOptions && animationOptions.onComplete, [context], chart);
}