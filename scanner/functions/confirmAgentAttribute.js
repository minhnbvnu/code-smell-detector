function confirmAgentAttribute(transaction) {
      const agentAttributes = transaction.trace.attributes.get(ATTR_DEST.TRANS_TRACE)
      const segment = transaction.agent.tracer.getSegment()
      const spanAttributes = segment.attributes.get(ATTR_DEST.SPAN_EVENT)

      t.equal(
        agentAttributes[EVENTSOURCE_ARN],
        'arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a'
      ) // eslint-disable-line max-len

      t.equal(agentAttributes[EVENTSOURCE_TYPE], 'alb')

      t.equal(agentAttributes['request.method'], 'GET')

      // validate that multi value query string parameters are normalized to comma seperated strings
      t.equal(agentAttributes['request.parameters.query'], '1234ABCD,other')

      t.equal(
        spanAttributes[EVENTSOURCE_ARN],
        'arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/lambda-279XGJDqGZ5rsrHC2Fjr/49e9d65c45c6791a'
      ) // eslint-disable-line max-len

      t.equal(spanAttributes[EVENTSOURCE_TYPE], 'alb')

      // validate that multi value headers are normalized to comma seperated strings
      t.equal(
        spanAttributes['request.headers.setCookie'],
        'cookie-name=cookie-value;Domain=myweb.com;Secure;HttpOnly,cookie-name=cookie-other-value'
      )
      t.end()
    }