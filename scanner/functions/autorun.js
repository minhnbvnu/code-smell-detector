function autorun(action) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var name = action.name || "Autorun@" + Object(__WEBPACK_IMPORTED_MODULE_6__utils__["s" /* nextId */])();

  if (typeof options === 'number') {
    options = {
      throttle: options
    };
  }

  var reaction = new Reaction(name, action, 0, options.throttle || 0);

  if (options.runFirstNow) {
    reaction.run();
  } else {
    reaction.schedule();
  }

  var disposer = function disposer() {
    reaction.sleep();
  };

  disposer.$obx = reaction;
  return disposer;
}