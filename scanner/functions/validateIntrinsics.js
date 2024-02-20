function validateIntrinsics(t, intrinsic, reqName, type, parentSpanId) {
  reqName = reqName || 'start'
  type = type || 'event'

  t.ok(intrinsic.guid, `${reqName} should have a guid on ${type}`)
  t.ok(intrinsic.traceId, `${reqName} should have a traceId on ${type}`)
  t.ok(intrinsic.sampled != null, `${reqName} should have a sampled boolean on ${type}`)
  t.ok(intrinsic.priority, `${reqName} should have a priority on ${type}`)

  if (reqName === 'start') {
    t.notOk(intrinsic.parentId, `${reqName} should not have a parentId on ${type}`)
    return
  }

  if (type !== 'trace') {
    t.ok(intrinsic.parentId, `${reqName} should have a parentId on ${type}`)
    t.equal(
      intrinsic.parentSpanId,
      parentSpanId,
      `${reqName} should have a parentSpanId of ${parentSpanId} on ${type}`
    )
  }
  t.ok(intrinsic['parent.app'], `${reqName} should have a parent app on ${type}`)
  t.ok(intrinsic['parent.type'], `${reqName} should have a parent type on ${type}`)
  t.ok(intrinsic['parent.account'], `${reqName} should have a parent account on ${type}`)
  t.ok(
    intrinsic['parent.transportType'],
    `${reqName} should have a parent transportType on ${type}`
  )
  t.ok(
    intrinsic['parent.transportDuration'],
    `${reqName} should have a parent transportDuration on ${type}`
  )
}