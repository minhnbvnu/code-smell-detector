function createProxyAndListen(chart, type, listener) {
  const canvas = chart.canvas;
  const proxy = throttled((event) => {
    // This case can occur if the chart is destroyed while waiting
    // for the throttled function to occur. We prevent crashes by checking
    // for a destroyed chart
    if (chart.ctx !== null) {
      listener(fromNativeEvent(event, chart));
    }
  }, chart);

  addListener(canvas, type, proxy);

  return proxy;
}