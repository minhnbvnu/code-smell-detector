function watchPostEffect(effect, options) {
    return doWatch(
      effect,
      null,
      extend({}, options, { flush: "post" }) 
    );
  }