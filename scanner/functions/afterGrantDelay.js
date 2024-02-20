function afterGrantDelay() {
    afterGrantDelay.mineDelay = true;
    beforeEach('set execution delay', async function () {
      this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
    });
    testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
  }