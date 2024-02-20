function testAsGetAccess({
  requiredRoleIsGranted: {
    roleGrantingIsDelayed: {
      // Because both grant and execution delay are set within the same $_grantRole call
      // it's not possible to create a set of tests that diverge between grant and execution delay.
      // Therefore, the testAsDelay arguments are renamed for clarity:
      // before => beforeGrantDelay
      // after => afterGrantDelay
      callerHasAnExecutionDelay: { beforeGrantDelay: case1, afterGrantDelay: case2 },
      callerHasNoExecutionDelay: { beforeGrantDelay: case3, afterGrantDelay: case4 },
    },
    roleGrantingIsNotDelayed: { callerHasAnExecutionDelay: case5, callerHasNoExecutionDelay: case6 },
  },
  requiredRoleIsNotGranted,
}) {
  describe('when the required role is granted to the caller', function () {
    describe('when role granting is delayed', function () {
      beforeEach('define delay', function () {
        this.grantDelay = time.duration.minutes(3);
        this.delay = this.grantDelay; // For testAsDelay
      });

      describe('when caller has an execution delay', function () {
        beforeEach('set role and delay', async function () {
          this.executionDelay = time.duration.hours(10);
          this.delay = this.grantDelay;
          await this.manager.$_grantRole(this.role.id, this.caller, this.grantDelay, this.executionDelay);
        });

        testAsDelay('grant', { before: case1, after: case2 });
      });

      describe('when caller has no execution delay', function () {
        beforeEach('set role and delay', async function () {
          this.executionDelay = 0n;
          await this.manager.$_grantRole(this.role.id, this.caller, this.grantDelay, this.executionDelay);
        });

        testAsDelay('grant', { before: case3, after: case4 });
      });
    });

    describe('when role granting is not delayed', function () {
      beforeEach('define delay', function () {
        this.grantDelay = 0n;
      });

      describe('when caller has an execution delay', function () {
        beforeEach('set role and delay', async function () {
          this.executionDelay = time.duration.hours(10);
          await this.manager.$_grantRole(this.role.id, this.caller, this.grantDelay, this.executionDelay);
        });

        case5();
      });

      describe('when caller has no execution delay', function () {
        beforeEach('set role and delay', async function () {
          this.executionDelay = 0n;
          await this.manager.$_grantRole(this.role.id, this.caller, this.grantDelay, this.executionDelay);
        });

        case6();
      });
    });
  });

  describe('when role is not granted', function () {
    // Because this helper can be composed with other helpers, it's possible
    // that role has been set already by another helper.
    // Although this is highly unlikely, we check for it here to avoid false positives.
    beforeEach('assert role is unset', async function () {
      const { since } = await this.manager.getAccess(this.role.id, this.caller);
      expect(since).to.equal(0n);
    });

    requiredRoleIsNotGranted();
  });
}