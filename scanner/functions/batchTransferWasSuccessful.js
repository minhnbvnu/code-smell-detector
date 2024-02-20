function batchTransferWasSuccessful() {
        it('debits transferred balances from sender', async function () {
          const newBalances = await this.token.balanceOfBatch(
            this.args.ids.map(() => this.args.from),
            this.args.ids,
          );
          expect(newBalances).to.deep.equal(this.args.ids.map(() => 0n));
        });

        it('credits transferred balances to receiver', async function () {
          const newBalances = await this.token.balanceOfBatch(
            this.args.ids.map(() => this.args.to),
            this.args.ids,
          );
          expect(newBalances).to.deep.equal(this.args.values);
        });

        it('emits a TransferBatch log', async function () {
          await expect(this.tx)
            .to.emit(this.token, 'TransferBatch')
            .withArgs(this.args.operator, this.args.from, this.args.to, this.args.ids, this.args.values);
        });
      }