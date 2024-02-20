function startTicking(fn) {
    var token = requestAnimationFrame(function tick() {
      fn();
      token = requestAnimationFrame(tick);
    });

    return function cancel() {
      cancelAnimationFrame(token);
    }
  }