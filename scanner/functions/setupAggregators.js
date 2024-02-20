function setupAggregators(enableAggregator) {
    agent.config.application_logging.enabled = enableAggregator
    agent.config.application_logging.forwarding.enabled = enableAggregator
    agent.config.slow_sql.enabled = enableAggregator
    agent.config.transaction_tracer.record_sql = 'raw'
    agent.config.distributed_tracing.enabled = enableAggregator
    agent.config.custom_insights_events.enabled = enableAggregator
    agent.config.transaction_events.enabled = enableAggregator
    agent.config.transaction_tracer.enabled = enableAggregator
    agent.config.collect_errors = enableAggregator
    agent.config.error_collector.capture_events = enableAggregator
    const runId = 1122
    const config = {
      agent_run_id: runId
    }
    const { redirect, handshake } = mockHandShake(config)
    const metrics = nock(URL)
      .post(helper.generateCollectorPath('metric_data', runId))
      .reply(200, { return_value: [] })
    const logs = nock(URL)
      .post(helper.generateCollectorPath('log_event_data', runId))
      .reply(200, { return_value: [] })
    const sql = nock(URL)
      .post(helper.generateCollectorPath('sql_trace_data', runId))
      .reply(200, { return_value: [] })
    const spanEventAggregator = nock(URL)
      .post(helper.generateCollectorPath('span_event_data', runId))
      .reply(200, { return_value: [] })
    const transactionEvents = nock(URL)
      .post(helper.generateCollectorPath('analytic_event_data', runId))
      .reply(200, { return_value: [] })
    const transactionSamples = nock(URL)
      .post(helper.generateCollectorPath('transaction_sample_data', runId))
      .reply(200, { return_value: [] })
    const customEvents = nock(URL)
      .post(helper.generateCollectorPath('custom_event_data', runId))
      .reply(200, { return_value: [] })
    const errorTransactionEvents = nock(URL)
      .post(helper.generateCollectorPath('error_data', runId))
      .reply(200, { return_value: [] })
    const errorEvents = nock(URL)
      .post(helper.generateCollectorPath('error_event_data', runId))
      .reply(200, { return_value: [] })

    return {
      redirect,
      handshake,
      metrics,
      logs,
      sql,
      spanEventAggregator,
      transactionSamples,
      transactionEvents,
      customEvents,
      errorTransactionEvents,
      errorEvents
    }
  }