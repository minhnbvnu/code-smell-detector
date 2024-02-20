function stopWhenDone(/* $0, app */) {
  /*
  // XXX(sam) I can't rember why we do this, especially since we don't wait for
  // stop to complete, and just kill ourself right away.
  function dieBy(signal) {
    console.log('%s: stopped with %s', $0, signal);
    app.stop();

    // re-kill ourself, so our exit status is signaled
    process.kill(process.pid, signal);
  }

  function dieOn(signal) {
    process.once(signal, dieBy.bind(null, signal));
  }

  dieOn('SIGHUP'); // XXX(sam) should this do a restart?
  dieOn('SIGINT');
  dieOn('SIGTERM');

  process.on('exit', function() {
    app.stop();
  });
  */
}