function nockMetricDataUncompressed() {
      return nock(URL)
        .post(generate('metric_data', RUN_ID))
        .matchHeader('Content-Encoding', 'identity')
        .reply(200, { return_value: [] })
    }