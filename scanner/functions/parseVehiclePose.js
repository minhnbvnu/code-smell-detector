function parseVehiclePose(vehiclePose, opts = {}) {
  // Callbacks to enable instrumentation
  const {onData = noop, onDone = noop, postProcessVehiclePose} = opts;
  const context = onData(opts) || opts.context;

  if (postProcessVehiclePose) {
    vehiclePose = vehiclePose
      .map(postProcessVehiclePose)
      // Remove invalid poses.
      .filter(Boolean);
  }

  onDone({...opts, context});

  return vehiclePose;
}