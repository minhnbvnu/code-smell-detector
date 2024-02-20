function runWorkerTest(t, total, workerFarmConfig, onFinished, skipEnd) {
  let processed = 0;

  const workerFarm = new WorkerFarm(workerFarmConfig);

  const onResult = (expected, result) => {
    processed++;
    t.deepEquals(result, expected, 'worker returns expected result');

    if (processed + workerFarm.dropped === total) {
      if (onFinished) {
        onFinished(workerFarm);
      }
      workerFarm.destroy();
      if (!skipEnd) {
        t.end();
      }
    }
  };

  for (let i = 0; i < total; i++) {
    const testData = {chunk: i};
    workerFarm.process(testData, onResult.bind(null, testData), err => t.fail(err));
  }
}