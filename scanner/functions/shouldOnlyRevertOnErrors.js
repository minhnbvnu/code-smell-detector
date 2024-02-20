function shouldOnlyRevertOnErrors() {
  describe('transfers', function () {
    beforeEach(async function () {
      await this.token.$_mint(this.owner, 100n);
      await this.token.$_mint(this.mock, 100n);
      await this.token.$_approve(this.owner, this.mock, ethers.MaxUint256);
    });

    it("doesn't revert on transfer", async function () {
      await expect(this.mock.$safeTransfer(this.token, this.receiver, 10n))
        .to.emit(this.token, 'Transfer')
        .withArgs(this.mock, this.receiver, 10n);
    });

    it("doesn't revert on transferFrom", async function () {
      await expect(this.mock.$safeTransferFrom(this.token, this.owner, this.receiver, 10n))
        .to.emit(this.token, 'Transfer')
        .withArgs(this.owner, this.receiver, 10n);
    });
  });

  describe('approvals', function () {
    describe('with zero allowance', function () {
      beforeEach(async function () {
        await this.token.$_approve(this.mock, this.spender, 0n);
      });

      it("doesn't revert when force approving a non-zero allowance", async function () {
        await this.mock.$forceApprove(this.token, this.spender, 100n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(100n);
      });

      it("doesn't revert when force approving a zero allowance", async function () {
        await this.mock.$forceApprove(this.token, this.spender, 0n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(0n);
      });

      it("doesn't revert when increasing the allowance", async function () {
        await this.mock.$safeIncreaseAllowance(this.token, this.spender, 10n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(10n);
      });

      it('reverts when decreasing the allowance', async function () {
        await expect(this.mock.$safeDecreaseAllowance(this.token, this.spender, 10n))
          .to.be.revertedWithCustomError(this.mock, 'SafeERC20FailedDecreaseAllowance')
          .withArgs(this.spender, 0n, 10n);
      });
    });

    describe('with non-zero allowance', function () {
      beforeEach(async function () {
        await this.token.$_approve(this.mock, this.spender, 100n);
      });

      it("doesn't revert when force approving a non-zero allowance", async function () {
        await this.mock.$forceApprove(this.token, this.spender, 20n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(20n);
      });

      it("doesn't revert when force approving a zero allowance", async function () {
        await this.mock.$forceApprove(this.token, this.spender, 0n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(0n);
      });

      it("doesn't revert when increasing the allowance", async function () {
        await this.mock.$safeIncreaseAllowance(this.token, this.spender, 10n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(110n);
      });

      it("doesn't revert when decreasing the allowance to a positive value", async function () {
        await this.mock.$safeDecreaseAllowance(this.token, this.spender, 50n);
        expect(await this.token.allowance(this.mock, this.spender)).to.equal(50n);
      });

      it('reverts when decreasing the allowance to a negative value', async function () {
        await expect(this.mock.$safeDecreaseAllowance(this.token, this.spender, 200n))
          .to.be.revertedWithCustomError(this.mock, 'SafeERC20FailedDecreaseAllowance')
          .withArgs(this.spender, 100n, 200n);
      });
    });
  });
}