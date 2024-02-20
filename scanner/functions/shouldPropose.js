function shouldPropose() {
          it('proposer can propose', async function () {
            const txPropose = await this.helper.connect(this.proposer).propose();

            await expect(txPropose)
              .to.emit(this.mock, 'ProposalCreated')
              .withArgs(
                this.proposal.id,
                this.proposer,
                this.proposal.targets,
                this.proposal.values,
                this.proposal.signatures,
                this.proposal.data,
                (await time.clockFromReceipt[mode](txPropose)) + votingDelay,
                (await time.clockFromReceipt[mode](txPropose)) + votingDelay + votingPeriod,
                this.proposal.description,
              );
          });

          it('someone else can propose', async function () {
            const txPropose = await this.helper.connect(this.voter1).propose();

            await expect(txPropose)
              .to.emit(this.mock, 'ProposalCreated')
              .withArgs(
                this.proposal.id,
                this.voter1,
                this.proposal.targets,
                this.proposal.values,
                this.proposal.signatures,
                this.proposal.data,
                (await time.clockFromReceipt[mode](txPropose)) + votingDelay,
                (await time.clockFromReceipt[mode](txPropose)) + votingDelay + votingPeriod,
                this.proposal.description,
              );
          });
        }