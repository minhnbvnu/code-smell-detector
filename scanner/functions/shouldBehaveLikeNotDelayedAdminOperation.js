function shouldBehaveLikeNotDelayedAdminOperation() {
  const getAccessPath = LIKE_COMMON_GET_ACCESS;

  function testScheduleOperation(mineDelay) {
    return function self() {
      self.mineDelay = mineDelay;
      beforeEach('set execution delay', async function () {
        this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
      });
      testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
    };
  }

  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasAnExecutionDelay.afterGrantDelay =
    testScheduleOperation(true);
  getAccessPath.requiredRoleIsGranted.roleGrantingIsNotDelayed.callerHasAnExecutionDelay = testScheduleOperation(false);

  beforeEach('set target as manager', function () {
    this.target = this.manager;
  });

  testAsRestrictedOperation({
    callerIsTheManager: LIKE_COMMON_IS_EXECUTING,
    callerIsNotTheManager() {
      testAsHasRole({
        publicRoleIsRequired() {
          it('reverts as AccessManagerUnauthorizedAccount', async function () {
            await expect(this.caller.sendTransaction({ to: this.target, data: this.calldata }))
              .to.be.revertedWithCustomError(this.target, 'AccessManagerUnauthorizedAccount')
              .withArgs(
                this.caller,
                this.roles.ADMIN.id, // Although PUBLIC_ROLE is required, admin ops are not subject to target function roles
              );
          });
        },
        specificRoleIsRequired: getAccessPath,
      });
    },
  });
}