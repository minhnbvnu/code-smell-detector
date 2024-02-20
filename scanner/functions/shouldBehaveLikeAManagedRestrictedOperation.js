function shouldBehaveLikeAManagedRestrictedOperation() {
  function revertUnauthorized() {
    it('reverts as AccessManagedUnauthorized', async function () {
      await expect(this.caller.sendTransaction({ to: this.target, data: this.calldata }))
        .to.be.revertedWithCustomError(this.target, 'AccessManagedUnauthorized')
        .withArgs(this.caller);
    });
  }

  const getAccessPath = LIKE_COMMON_GET_ACCESS;

  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasAnExecutionDelay.beforeGrantDelay =
    revertUnauthorized;
  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasNoExecutionDelay.beforeGrantDelay =
    revertUnauthorized;
  getAccessPath.requiredRoleIsNotGranted = revertUnauthorized;

  function testScheduleOperation(mineDelay) {
    return function self() {
      self.mineDelay = mineDelay;
      beforeEach('sets execution delay', async function () {
        this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
      });
      testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
    };
  }

  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasAnExecutionDelay.afterGrantDelay =
    testScheduleOperation(true);
  getAccessPath.requiredRoleIsGranted.roleGrantingIsNotDelayed.callerHasAnExecutionDelay = testScheduleOperation(false);

  const isExecutingPath = LIKE_COMMON_IS_EXECUTING;
  isExecutingPath.notExecuting = revertUnauthorized;

  testAsCanCall({
    closed: revertUnauthorized,
    open: {
      callerIsTheManager: isExecutingPath,
      callerIsNotTheManager: {
        publicRoleIsRequired() {
          it('succeeds called directly', async function () {
            await this.caller.sendTransaction({ to: this.target, data: this.calldata });
          });

          it('succeeds via execute', async function () {
            await this.manager.connect(this.caller).execute(this.target, this.calldata);
          });
        },
        specificRoleIsRequired: getAccessPath,
      },
    },
  });
}