function testScheduleOperation(mineDelay) {
    return function self() {
      self.mineDelay = mineDelay;
      beforeEach('sets execution delay', async function () {
        this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
      });
      testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
    };
  }