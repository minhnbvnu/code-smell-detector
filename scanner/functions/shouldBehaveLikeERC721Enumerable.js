function shouldBehaveLikeERC721Enumerable() {
  beforeEach(async function () {
    const [owner, newOwner, approved, operator, other] = this.accounts;
    Object.assign(this, { owner, newOwner, approved, operator, other });
  });

  shouldSupportInterfaces(['ERC721Enumerable']);

  describe('with minted tokens', function () {
    beforeEach(async function () {
      await this.token.$_mint(this.owner, firstTokenId);
      await this.token.$_mint(this.owner, secondTokenId);
      this.to = this.other;
    });

    describe('totalSupply', function () {
      it('returns total token supply', async function () {
        expect(await this.token.totalSupply()).to.equal(2n);
      });
    });

    describe('tokenOfOwnerByIndex', function () {
      describe('when the given index is lower than the amount of tokens owned by the given address', function () {
        it('returns the token ID placed at the given index', async function () {
          expect(await this.token.tokenOfOwnerByIndex(this.owner, 0n)).to.equal(firstTokenId);
        });
      });

      describe('when the index is greater than or equal to the total tokens owned by the given address', function () {
        it('reverts', async function () {
          await expect(this.token.tokenOfOwnerByIndex(this.owner, 2n))
            .to.be.revertedWithCustomError(this.token, 'ERC721OutOfBoundsIndex')
            .withArgs(this.owner, 2n);
        });
      });

      describe('when the given address does not own any token', function () {
        it('reverts', async function () {
          await expect(this.token.tokenOfOwnerByIndex(this.other, 0n))
            .to.be.revertedWithCustomError(this.token, 'ERC721OutOfBoundsIndex')
            .withArgs(this.other, 0n);
        });
      });

      describe('after transferring all tokens to another user', function () {
        beforeEach(async function () {
          await this.token.connect(this.owner).transferFrom(this.owner, this.other, firstTokenId);
          await this.token.connect(this.owner).transferFrom(this.owner, this.other, secondTokenId);
        });

        it('returns correct token IDs for target', async function () {
          expect(await this.token.balanceOf(this.other)).to.equal(2n);

          expect(await Promise.all([0n, 1n].map(i => this.token.tokenOfOwnerByIndex(this.other, i)))).to.have.members([
            firstTokenId,
            secondTokenId,
          ]);
        });

        it('returns empty collection for original owner', async function () {
          expect(await this.token.balanceOf(this.owner)).to.equal(0n);
          await expect(this.token.tokenOfOwnerByIndex(this.owner, 0n))
            .to.be.revertedWithCustomError(this.token, 'ERC721OutOfBoundsIndex')
            .withArgs(this.owner, 0n);
        });
      });
    });

    describe('tokenByIndex', function () {
      it('returns all tokens', async function () {
        expect(await Promise.all([0n, 1n].map(i => this.token.tokenByIndex(i)))).to.have.members([
          firstTokenId,
          secondTokenId,
        ]);
      });

      it('reverts if index is greater than supply', async function () {
        await expect(this.token.tokenByIndex(2n))
          .to.be.revertedWithCustomError(this.token, 'ERC721OutOfBoundsIndex')
          .withArgs(ethers.ZeroAddress, 2n);
      });

      for (const tokenId of [firstTokenId, secondTokenId]) {
        it(`returns all tokens after burning token ${tokenId} and minting new tokens`, async function () {
          const newTokenId = 300n;
          const anotherNewTokenId = 400n;

          await this.token.$_burn(tokenId);
          await this.token.$_mint(this.newOwner, newTokenId);
          await this.token.$_mint(this.newOwner, anotherNewTokenId);

          expect(await this.token.totalSupply()).to.equal(3n);

          expect(await Promise.all([0n, 1n, 2n].map(i => this.token.tokenByIndex(i))))
            .to.have.members([firstTokenId, secondTokenId, newTokenId, anotherNewTokenId].filter(x => x !== tokenId))
            .to.not.include(tokenId);
        });
      }
    });
  });

  describe('_mint(address, uint256)', function () {
    it('reverts with a null destination address', async function () {
      await expect(this.token.$_mint(ethers.ZeroAddress, firstTokenId))
        .to.be.revertedWithCustomError(this.token, 'ERC721InvalidReceiver')
        .withArgs(ethers.ZeroAddress);
    });

    describe('with minted token', async function () {
      beforeEach(async function () {
        await this.token.$_mint(this.owner, firstTokenId);
      });

      it('adjusts owner tokens by index', async function () {
        expect(await this.token.tokenOfOwnerByIndex(this.owner, 0n)).to.equal(firstTokenId);
      });

      it('adjusts all tokens list', async function () {
        expect(await this.token.tokenByIndex(0n)).to.equal(firstTokenId);
      });
    });
  });

  describe('_burn', function () {
    it('reverts when burning a non-existent token id', async function () {
      await expect(this.token.$_burn(firstTokenId))
        .to.be.revertedWithCustomError(this.token, 'ERC721NonexistentToken')
        .withArgs(firstTokenId);
    });

    describe('with minted tokens', function () {
      beforeEach(async function () {
        await this.token.$_mint(this.owner, firstTokenId);
        await this.token.$_mint(this.owner, secondTokenId);
      });

      describe('with burnt token', function () {
        beforeEach(async function () {
          await this.token.$_burn(firstTokenId);
        });

        it('removes that token from the token list of the owner', async function () {
          expect(await this.token.tokenOfOwnerByIndex(this.owner, 0n)).to.equal(secondTokenId);
        });

        it('adjusts all tokens list', async function () {
          expect(await this.token.tokenByIndex(0n)).to.equal(secondTokenId);
        });

        it('burns all tokens', async function () {
          await this.token.$_burn(secondTokenId);
          expect(await this.token.totalSupply()).to.equal(0n);

          await expect(this.token.tokenByIndex(0n))
            .to.be.revertedWithCustomError(this.token, 'ERC721OutOfBoundsIndex')
            .withArgs(ethers.ZeroAddress, 0n);
        });
      });
    });
  });
}