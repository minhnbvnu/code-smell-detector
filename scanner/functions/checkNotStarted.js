function checkNotStarted() {
      t.notOk(notStarted.timer.hrstart)
      t.equal(contextManager.getContext(), notStarted)
      t.notOk(notStarted.timer.hrDuration)
    }