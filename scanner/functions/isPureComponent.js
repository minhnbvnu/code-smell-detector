function isPureComponent(Component) {
	  return !!(Component.prototype && Component.prototype.isPureReactComponent);
	}