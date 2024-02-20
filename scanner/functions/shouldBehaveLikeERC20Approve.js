function shouldBehaveLikeERC20Approve(supply) {
  describe('when the spender is not the zero address', function () {
    describe('when the sender has enough balance', function () {
      const value = supply;

      it('emits an approval event', async function () {
        await expect(this.approve(this.holder, this.recipient, value))
          .to.emit(this.token, 'Approval')
          .withArgs(this.holder, this.recipient, value);
      });

      it('approves the requested value when there was no approved value before', async function () {
        await this.approve(this.holder, this.recipient, value);

        expect(await this.token.allowance(this.holder, this.recipient)).to.equal(value);
      });

      it('approves the requested value and replaces the previous one when the spender had an approved value', async function () {
        await this.approve(this.holder, this.recipient, 1n);
        await this.approve(this.holder, this.recipient, value);

        expect(await this.token.allowance(this.holder, this.recipient)).to.equal(value);
      });
    });

    describe('when the sender does not have enough balance', function () {
      const value = supply + 1n;

      it('emits an approval event', async function () {
        await expect(this.approve(this.holder, this.recipient, value))
          .to.emit(this.token, 'Approval')
          .withArgs(this.holder, this.recipient, value);
      });

      it('approves the requested value when there was no approved value before', async function () {
        await this.approve(this.holder, this.recipient, value);

        expect(await this.token.allowance(this.holder, this.recipient)).to.equal(value);
      });

      it('approves the requested value and replaces the previous one when the spender had an approved value', async function () {
        await this.approve(this.holder, this.recipient, 1n);
        await this.approve(this.holder, this.recipient, value);

        expect(await this.token.allowance(this.holder, this.recipient)).to.equal(value);
      });
    });
  });

  it('reverts when the spender is the zero address', async function () {
    await expect(this.approve(this.holder, ethers.ZeroAddress, supply))
      .to.be.revertedWithCustomError(this.token, `ERC20InvalidSpender`)
      .withArgs(ethers.ZeroAddress);
  });
}