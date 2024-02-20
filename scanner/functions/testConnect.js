function testConnect(t, cb) {
    collectorApi.connect(() => {
      t.ok(failure.isDone())
      t.ok(success.isDone())
      t.ok(connect.isDone())

      cb()
    })
  }