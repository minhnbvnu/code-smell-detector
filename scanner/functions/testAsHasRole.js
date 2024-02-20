function testAsHasRole({ publicRoleIsRequired, specificRoleIsRequired }) {
  describe('when the function requires the caller to be granted with the PUBLIC_ROLE', function () {
    beforeEach('set target function role as PUBLIC_ROLE', async function () {
      this.role = this.roles.PUBLIC;
      await this.manager
        .connect(this.roles.ADMIN.members[0])
        .$_setTargetFunctionRole(this.target, this.calldata.substring(0, 10), this.role.id);
    });

    publicRoleIsRequired();
  });

  describe('when the function requires the caller to be granted with a role other than PUBLIC_ROLE', function () {
    beforeEach('set target function role as PUBLIC_ROLE', async function () {
      await this.manager
        .connect(this.roles.ADMIN.members[0])
        .$_setTargetFunctionRole(this.target, this.calldata.substring(0, 10), this.role.id);
    });

    testAsGetAccess(specificRoleIsRequired);
  });
}