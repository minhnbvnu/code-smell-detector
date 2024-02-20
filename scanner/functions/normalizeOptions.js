function normalizeOptions(options) {
  if (typeof options.duration === 'string') {
    options.duration = parseFloat(options.duration, 10);
  }

  if (typeof options.hz === 'string') {
    options.hz = parseInt(options.hz, 10);
  }

  if (typeof options.live === 'string') {
    options.live = Boolean(options.live);
  }

  if (typeof options.speed === 'string') {
    options.speed = parseFloat(options.speed);
  }

  if (typeof options.radius === 'string') {
    options.radius = parseFloat(options.radius);
  }

  return options;
}