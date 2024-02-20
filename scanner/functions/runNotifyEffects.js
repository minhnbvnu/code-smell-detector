function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    let fxs = inst[TYPES.NOTIFY];
    let notified;
    let id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (let prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    let host;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }