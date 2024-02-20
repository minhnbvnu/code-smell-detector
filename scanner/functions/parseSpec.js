function parseSpec(spec) {
  // spec seems to have some internal parsing state "index" which prevents accessing it consistently
  // https://github.com/gritzko/swarm/issues/53
  let oldIndex = spec.index
  spec.index = 0
  let source
  try {
    source = spec.source()
  } catch (e) {
    source = null
  }
  let op
  try {
    op = spec.op()
  } catch (e) {
    op = null
  }
  spec.index = oldIndex
  return {
    source: source,
    op: op
  }
}