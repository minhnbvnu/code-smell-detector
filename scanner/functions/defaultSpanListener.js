function defaultSpanListener(t) {
      const { config, expectedRunId, expectedSessionId } = t.context

      let i = 0

      return function onSpans(data, metadata) {
        if (config.batching) {
          t.batch(data)
        } else {
          t.single(data, i)
          i++
        }

        const [licenseKey] = metadata.get('license_key')
        t.equal(licenseKey, EXPECTED_LICENSE_KEY, 'expected license key')

        const [runId] = metadata.get('agent_run_token')
        t.equal(runId, expectedRunId, 'agent_run_token matches')

        const [sessionId] = metadata.get('session_id')
        t.equal(sessionId, expectedSessionId, 'should persist new request_headers_map on metadata')

        if (config.batching || i === 1) {
          t.end()
        }
      }
    }