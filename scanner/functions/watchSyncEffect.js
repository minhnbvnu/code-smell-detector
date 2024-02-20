function watchSyncEffect(effect, options) {
    return doWatch(
      effect,
      null,
      extend({}, options, { flush: "sync" }) 
    );
  }