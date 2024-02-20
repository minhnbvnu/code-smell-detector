function transferWasSuccessful() {
        it('debits transferred balance from sender', async function () {
          expect(await this.token.balanceOf(this.args.from, this.args.id)).to.equal(0n);
        });

        it('credits transferred balance to receiver', async function () {
          expect(await this.token.balanceOf(this.args.to, this.args.id)).to.equal(this.args.value);
        });

        it('emits a TransferSingle log', async function () {
          await expect(this.tx)
            .to.emit(this.token, 'TransferSingle')
            .withArgs(this.args.operator, this.args.from, this.args.to, this.args.id, this.args.value);
        });
      }