function testSetup(t, config, callback) {
      nock.disableNetConnect()
      startingEndpoints = setupConnectionEndpoints(INITIAL_RUN_ID, INITIAL_SESSION_ID)

      helper
        .withSSL()
        .then(([key, certificate, ca]) => {
          const sslOpts = {
            ca,
            authPairs: [{ private_key: key, cert_chain: certificate }]
          }

          const services = [
            {
              serviceDefinition: infiniteTracingService.IngestService.service,
              implementation: { recordSpan, recordSpanBatch }
            }
          ]

          server = createGrpcServer(sslOpts, services, (err, port) => {
            t.error(err)

            server.start()

            agent = helper.loadMockedAgent({
              license_key: EXPECTED_LICENSE_KEY,
              apdex_t: Number.MIN_VALUE, // force transaction traces
              host: TEST_DOMAIN,
              plugins: {
                // turn off native metrics to avoid unwanted gc metrics
                native_metrics: { enabled: false }
              },
              distributed_tracing: { enabled: true },
              slow_sql: { enabled: true },
              transaction_tracer: {
                record_sql: 'obfuscated',
                explain_threshold: Number.MIN_VALUE // force SQL traces
              },
              infinite_tracing: {
                ...config,
                span_events: {
                  queue_size: 2
                },
                trace_observer: {
                  host: helper.SSL_HOST,
                  port
                }
              }
            })

            agent.config.no_immediate_harvest = true

            // Currently test-only configuration
            const origEnv = process.env.NEWRELIC_GRPCCONNECTION_CA
            process.env.NEWRELIC_GRPCCONNECTION_CA = ca
            t.teardown(() => {
              process.env.NEWRELIC_GRPCCONNECTION_CA = origEnv
            })

            if (callback) {
              callback()
            }
          })
        })
        .catch((err) => {
          t.error(err)
        })
    }