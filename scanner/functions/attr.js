function attr(configOrTarget, prop) {
  let config;

  function decorator($target, $prop) {
    if (arguments.length > 1) {
      // Non invocation:
      // - @attr
      // Invocation with or w/o opts:
      // - @attr()
      // - @attr({...opts})
      config.property = $prop;
    }

    const attributes = $target.constructor.attributes || ($target.constructor.attributes = []);
    attributes.push(config);
  }

  if (arguments.length > 1) {
    // Non invocation:
    // - @attr
    config = {};
    decorator(configOrTarget, prop);
    return;
  } // Invocation with or w/o opts:
  // - @attr()
  // - @attr({...opts})


  config = configOrTarget === void 0 ? {} : configOrTarget;
  return decorator;
}