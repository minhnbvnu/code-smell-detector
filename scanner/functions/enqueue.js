function enqueue(fn) {
  Promise.resolve().then(() => {
    try { fn() }
    catch (e) { hostReportError(e) }
  });
}