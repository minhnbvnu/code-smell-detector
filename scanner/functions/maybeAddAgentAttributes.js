function maybeAddAgentAttributes(attributes, exception) {
  if (exception.errorGroupCallback) {
    const callbackInput = {
      'error': exception.error,
      'customAttributes': Object.assign({}, attributes.userAttributes),
      'request.uri': attributes.agentAttributes['request.uri'],
      'http.statusCode': attributes.agentAttributes['http.statusCode'],
      'http.method': attributes.agentAttributes['request.method'],
      'error.expected': attributes.intrinsics[ERROR_EXPECTED_PATH]
    }

    try {
      const callbackOutput = exception.errorGroupCallback(callbackInput)

      if (!isValidErrorGroupOutput(callbackOutput)) {
        logger.warn('Function provided via setErrorGroupCallback return value malformed')
        return
      }

      attributes.agentAttributes['error.group.name'] = callbackOutput
    } catch (err) {
      logger.warn(
        err,
        'Function provided via setErrorGroupCallback failed, not generating `error.group.name`'
      )
    }
  }
}