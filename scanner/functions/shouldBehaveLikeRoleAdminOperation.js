function shouldBehaveLikeRoleAdminOperation(roleAdmin) {
  const getAccessPath = LIKE_COMMON_GET_ACCESS;

  function afterGrantDelay() {
    afterGrantDelay.mineDelay = true;
    beforeEach('set execution delay', async function () {
      this.scheduleIn = this.executionDelay; // For testAsSchedulableOperation
    });
    testAsSchedulableOperation(LIKE_COMMON_SCHEDULABLE);
  }

  getAccessPath.requiredRoleIsGranted.roleGrantingIsDelayed.callerHasAnExecutionDelay.afterGrantDelay = afterGrantDelay;
  getAccessPath.requiredRoleIsGranted.roleGrantingIsNotDelayed.callerHasAnExecutionDelay = afterGrantDelay;

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
              .withArgs(this.caller, roleAdmin);
          });
        },
        specificRoleIsRequired: getAccessPath,
      });
    },
  });
}