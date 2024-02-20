function revertUnauthorized() {
    it('reverts as AccessManagedUnauthorized', async function () {
      await expect(this.caller.sendTransaction({ to: this.target, data: this.calldata }))
        .to.be.revertedWithCustomError(this.target, 'AccessManagedUnauthorized')
        .withArgs(this.caller);
    });
  }