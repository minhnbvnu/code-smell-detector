function formatTrace(trace) {
  // remove error message and instrumentation frames from stack trace
  return trace ? trace.split('\n').slice(1).filter(notNR).join('\n') : ''
}