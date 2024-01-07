function invalidatePlugins() {
  return each(Chart.instances, (chart) => chart._plugins.invalidate());
}