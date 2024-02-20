function divideMetric(metric, divisor) {
  metric.min /= divisor
  metric.max /= divisor
  metric.total /= divisor
  metric.sumOfSquares /= divisor * divisor
}