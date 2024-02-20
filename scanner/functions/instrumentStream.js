function instrumentStream({ agent, shim, request, response, segment }) {
  if (!agent.config.ai_monitoring.streaming.enabled) {
    shim.logger.warn(
      '`ai_monitoring.streaming.enabled` is set to `false`, stream will not be instrumented.'
    )
    agent.metrics.getOrCreateMetric(AI.STREAMING_DISABLED).incrementCallCount()
    return
  }

  shim.wrap(response, 'iterator', function wrapIterator(shim, orig) {
    return async function* wrappedIterator() {
      let content = ''
      let role = ''
      let chunk
      let err
      try {
        const iterator = orig.apply(this, arguments)

        for await (chunk of iterator) {
          if (chunk.choices?.[0]?.delta?.role) {
            role = chunk.choices[0].delta.role
          }

          content += chunk.choices?.[0]?.delta?.content ?? ''
          yield chunk
        }
      } catch (streamErr) {
        err = streamErr
        throw err
      } finally {
        chunk.choices[0].message = { role, content }
        // update segment duration since we want to extend the time it took to
        // handle the stream
        segment.touch()

        recordChatCompletionMessages({
          agent: shim.agent,
          segment,
          request,
          response: chunk,
          err
        })
      }
    }
  })
}