function loadIndex() {
    return proxyquire('../../index', {
      'worker_threads': workerThreadsStub,
      './lib/util/process-version': processVersionStub,
      './lib/logger': loggerMock,
      './lib/agent': MockAgent,
      './lib/config': configMock,
      './lib/shimmer': shimmerMock,
      '@newrelic/security-agent': k2Stub
    })
  }