function testAsSchedulableOperation({ scheduled: { before, after, expired }, notScheduled }) {
  describe('when operation is scheduled', function () {
    beforeEach('schedule operation', async function () {
      if (this.caller.target) {
        await impersonate(this.caller.target);
        this.caller = await ethers.getSigner(this.caller.target);
      }
      const { operationId, schedule } = await prepareOperation(this.manager, {
        caller: this.caller,
        target: this.target,
        calldata: this.calldata,
        delay: this.scheduleIn,
      });
      await schedule();
      this.operationId = operationId;
    });

    describe('when operation is not ready for execution', function () {
      beforeEach('set next block time before operation is ready', async function () {
        this.scheduledAt = await time.clock.timestamp();
        const schedule = await this.manager.getSchedule(this.operationId);
        await time.increaseTo.timestamp(schedule - 1n, !!before.mineDelay);
      });

      before();
    });

    describe('when operation is ready for execution', function () {
      beforeEach('set next block time when operation is ready for execution', async function () {
        this.scheduledAt = await time.clock.timestamp();
        const schedule = await this.manager.getSchedule(this.operationId);
        await time.increaseTo.timestamp(schedule, !!after.mineDelay);
      });

      after();
    });

    describe('when operation has expired', function () {
      beforeEach('set next block time when operation expired', async function () {
        this.scheduledAt = await time.clock.timestamp();
        const schedule = await this.manager.getSchedule(this.operationId);
        await time.increaseTo.timestamp(schedule + EXPIRATION, !!expired.mineDelay);
      });

      expired();
    });
  });

  describe('when operation is not scheduled', function () {
    beforeEach('set expected operationId', async function () {
      this.operationId = await this.manager.hashOperation(this.caller, this.target, this.calldata);

      // Assert operation is not scheduled
      expect(await this.manager.getSchedule(this.operationId)).to.equal(0n);
    });

    notScheduled();
  });
}