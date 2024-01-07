function isIChartComponent(proto) {
  return 'id' in proto && 'defaults' in proto;
}