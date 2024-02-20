function wait(t, extra, time, reason, next) {
  t.ok(true, fmt('%dms pause: %', time, reason));
  setTimeout(next, time);
}