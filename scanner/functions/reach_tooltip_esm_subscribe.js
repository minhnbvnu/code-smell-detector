function reach_tooltip_esm_subscribe(fn) {
  subscriptions.push(fn);
  return function () {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}