function findMetric(metrics, name) {
  for (let i = 0; i < metrics.length; i++) {
    const metric = metrics[i]
    if (metric[0].name === name) {
      return metric
    }
  }
}