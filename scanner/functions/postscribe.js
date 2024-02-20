function postscribe(el, html, options) {
  if (utils.isFunction(options)) {
    options = {done: options};
  } else if (options === 'clear') {
    queue = [];
    active = null;
    nextId = 0;
    return;
  }

  options = utils.defaults(options, OPTIONS);

  // id selector
  if ((/^#/).test(el)) {
    el = window.document.getElementById(el.substr(1));
  } else {
    el = el.jquery ? el[0] : el;
  }

  const args = [el, html, options];

  el.postscribe = {
    cancel: () => {
      if (args.stream) {
        args.stream.abort();
      } else {
        args[1] = doNothing;
      }
    }
  };

  options.beforeEnqueue(args);
  queue.push(args);

  if (!active) {
    nextStream();
  }

  return el.postscribe;
}