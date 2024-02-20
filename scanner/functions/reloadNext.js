function reloadNext(master, count, aliveWorkers) {
  let firstWorker;
  let newWorker;

  function reset() {
    // don't leak
    newWorker.removeListener('listening', reset);
    newWorker.removeListener('error', reset);

    if (firstWorker) {
      // console.log('firstWorker %s %s', firstWorker.id, firstWorker.state);
      firstWorker.kill(KILL_SIGNAL);
      setTimeout(function () {
        firstWorker.process.kill(KILL_SIGNAL);
      }, 100);
    }
    reloading = false;
    if (reloadPedding) {
      // has reload jobs, reload again
      reloadPedding = false;
      reload(master, count);
    }
  }

  firstWorker = aliveWorkers[0];
  newWorker = cluster.fork();
  newWorker.on('listening', reset).on('exit', reset);

  // kill other workers
  for (let i = 1; i < aliveWorkers.length; i++) {
    const worker = aliveWorkers[i];
    // console.log('worker %s %s', worker.id, worker.state);
    worker.kill(KILL_SIGNAL);
  }

  // keep workers number as before
  const left = count - 1;
  for (let j = 0; j < left; j++) {
    cluster.fork();
  }
}