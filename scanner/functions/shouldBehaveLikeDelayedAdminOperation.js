function shouldBehaveLikeDelayedAdminOperation() {
  const getAccessPath = LIKE_COMMON_GET_ACCESS;
  testAsDelayedOperation.mineDelay = true;
  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasAnExecutionDelay.afterGrantDelay =
    testAsDelayedOperation;
  getAccessPath.requiredRoleIsGranted.roleGrantingIsNotDelayed.callerHasAnExecutionDelay = function () {
    beforeEach('set execution delay', async function () {
      this.scheduleIn = this.executionDelay; // For testAsDelayedOperation
    });
    testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
  };

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
                this.roles.ADMIN.id, // Although PUBLIC is required, target function role doesn't apply to admin ops
              );
          });
        },
        specificRoleIsRequired: getAccessPath,
      });
    },
  });
}