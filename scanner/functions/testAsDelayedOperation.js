function testAsDelayedOperation() {
  describe('with operation delay', function () {
    describe('when operation delay is greater than execution delay', function () {
      beforeEach('set operation delay', async function () {
        this.operationDelay = this.executionDelay + time.duration.hours(1);
        await this.manager.$_setTargetAdminDelay(this.target, this.operationDelay);
        this.scheduleIn = this.operationDelay; // For testAsSchedulableOperation
      });

      testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
    });

    describe('when operation delay is shorter than execution delay', function () {
      beforeEach('set operation delay', async function () {
        this.operationDelay = this.executionDelay - time.duration.hours(1);
        await this.manager.$_setTargetAdminDelay(this.target, this.operationDelay);
        this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
      });

      testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
    });
  });

  describe('without operation delay', function () {
    beforeEach('set operation delay', async function () {
      this.operationDelay = 0n;
      await this.manager.$_setTargetAdminDelay(this.target, this.operationDelay);
      this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
    });

    testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
  });
}