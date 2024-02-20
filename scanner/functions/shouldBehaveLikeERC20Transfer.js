function shouldBehaveLikeERC20Transfer(balance) {
  describe('when the recipient is not the zero address', function () {
    it('reverts when the sender does not have enough balance', async function () {
      const value = balance + 1n;
      await expect(this.transfer(this.holder, this.recipient, value))
        .to.be.revertedWithCustomError(this.token, 'ERC20InsufficientBalance')
        .withArgs(this.holder, balance, value);
    });

    describe('when the sender transfers all balance', function () {
      const value = balance;

      beforeEach(async function () {
        this.tx = await this.transfer(this.holder, this.recipient, value);
      });

      it('transfers the requested value', async function () {
        await expect(this.tx).to.changeTokenBalances(this.token, [this.holder, this.recipient], [-value, value]);
      });

      it('emits a transfer event', async function () {
        await expect(this.tx).to.emit(this.token, 'Transfer').withArgs(this.holder, this.recipient, value);
      });
    });

    describe('when the sender transfers zero tokens', function () {
      const value = 0n;

      beforeEach(async function () {
        this.tx = await this.transfer(this.holder, this.recipient, value);
      });

      it('transfers the requested value', async function () {
        await expect(this.tx).to.changeTokenBalances(this.token, [this.holder, this.recipient], [0n, 0n]);
      });

      it('emits a transfer event', async function () {
        await expect(this.tx).to.emit(this.token, 'Transfer').withArgs(this.holder, this.recipient, value);
      });
    });
  });

  it('reverts when the recipient is the zero address', async function () {
    await expect(this.transfer(this.holder, ethers.ZeroAddress, balance))
      .to.be.revertedWithCustomError(this.token, 'ERC20InvalidReceiver')
      .withArgs(ethers.ZeroAddress);
  });
}