function _acceptDistributedTracePayload(payload, transport) {
  const payloadTest = _dtPayloadTest.bind(this)
  if (!payloadTest(payload)) {
    return
  }

  const isDtTest = _isDtTest.bind(this)
  if (isDtTest()) {
    return
  }

  const configTest = _dtConfigTest.bind(this)
  const configTestResult = configTest()
  if (!configTestResult) {
    return
  }

  const traceParseTest = _dtParseTest.bind(this)
  const parsed = traceParseTest(payload)
  if (!parsed) {
    return
  }

  const traceVersionTest = _dtVersionTest.bind(this)
  if (traceVersionTest(parsed) > 0) {
    return
  }

  const data = parsed.d

  if (!data) {
    logger.warn('No distributed trace data received, not accepting payload')
    this.agent.recordSupportability(DT_ACCEPT_PAYLOAD_EXCEPTION_METRIC)
    return
  }

  const requiredKeyTest = _dtRequiredKeyTest.bind(this)
  const requiredKeysExist = requiredKeyTest(data)
  const spanParentTest = _dtSpanParentTest.bind(this)
  const spanParentResult = spanParentTest(requiredKeysExist, data)

  if (!spanParentResult) {
    return
  }

  const trustedAccount = configTestResult
  const trustedAccountKey = data.tk || data.ac
  if (trustedAccountKey !== trustedAccount) {
    this.agent.recordSupportability(`DistributedTrace/AcceptPayload/Ignored/UntrustedAccount`)
    return
  }

  const defineAttrsFromTraceData = _dtDefineAttrsFromTraceData.bind(this)
  defineAttrsFromTraceData(data, transport)
}