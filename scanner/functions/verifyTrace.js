function verifyTrace(t, segment, selectTable) {
    const transaction = segment.transaction
    selectTable = selectTable || TABLE
    const trace = transaction.trace

    t.ok(trace, 'trace should exist')
    t.ok(trace.root, 'root element should exist')

    const setSegment = findSegment(trace.root, 'Datastore/statement/Postgres/' + TABLE + '/insert')

    const getSegment = findSegment(
      trace.root,
      'Datastore/statement/Postgres/' + selectTable + '/select'
    )

    t.ok(setSegment, 'trace segment for insert should exist')
    t.ok(getSegment, 'trace segment for select should exist')

    if (!getSegment) {
      return
    }

    t.equal(
      getSegment.name,
      'Datastore/statement/Postgres/' + selectTable + '/select',
      'should register the query call'
    )

    t.ok(getSegment.timer.hrDuration, 'trace segment should have ended')
  }