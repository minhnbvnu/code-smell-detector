function nockMetric500() {
      return nock(URL).post(generate('metric_data', RUN_ID)).reply(500, { return_value: [] })
    }