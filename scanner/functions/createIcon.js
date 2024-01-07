function createIcon(count) {
  const StatusIconComponent = require('./status-icon-component');
  return new StatusIconComponent({ count });
}