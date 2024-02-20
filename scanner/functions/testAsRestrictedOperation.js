function testAsRestrictedOperation({ callerIsTheManager: { executing, notExecuting }, callerIsNotTheManager }) {
  describe('when the call comes from the manager (msg.sender == manager)', function () {
    beforeEach('define caller as manager', async function () {
      this.caller = this.manager;
      if (this.caller.target) {
        await impersonate(this.caller.target);
        this.caller = await ethers.getSigner(this.caller.target);
      }
    });

    describe('when _executionId is in storage for target and selector', function () {
      beforeEach('set _executionId flag from calldata and target', async function () {
        const executionId = ethers.keccak256(
          ethers.AbiCoder.defaultAbiCoder().encode(
            ['address', 'bytes4'],
            [this.target.target, this.calldata.substring(0, 10)],
          ),
        );
        await setStorageAt(this.manager.target, EXECUTION_ID_STORAGE_SLOT, executionId);
      });

      executing();
    });

    describe('when _executionId does not match target and selector', notExecuting);
  });

  describe('when the call does not come from the manager (msg.sender != manager)', function () {
    beforeEach('define non manager caller', function () {
      this.caller = this.roles.SOME.members[0];
    });

    callerIsNotTheManager();
  });
}