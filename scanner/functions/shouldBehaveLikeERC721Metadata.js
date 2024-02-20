function shouldBehaveLikeERC721Metadata(name, symbol) {
  shouldSupportInterfaces(['ERC721Metadata']);

  describe('metadata', function () {
    it('has a name', async function () {
      expect(await this.token.name()).to.equal(name);
    });

    it('has a symbol', async function () {
      expect(await this.token.symbol()).to.equal(symbol);
    });

    describe('token URI', function () {
      beforeEach(async function () {
        await this.token.$_mint(this.owner, firstTokenId);
      });

      it('return empty string by default', async function () {
        expect(await this.token.tokenURI(firstTokenId)).to.equal('');
      });

      it('reverts when queried for non existent token id', async function () {
        await expect(this.token.tokenURI(nonExistentTokenId))
          .to.be.revertedWithCustomError(this.token, 'ERC721NonexistentToken')
          .withArgs(nonExistentTokenId);
      });

      describe('base URI', function () {
        beforeEach(function () {
          if (!this.token.interface.hasFunction('setBaseURI')) {
            this.skip();
          }
        });

        it('base URI can be set', async function () {
          await this.token.setBaseURI(baseURI);
          expect(await this.token.baseURI()).to.equal(baseURI);
        });

        it('base URI is added as a prefix to the token URI', async function () {
          await this.token.setBaseURI(baseURI);
          expect(await this.token.tokenURI(firstTokenId)).to.equal(baseURI + firstTokenId.toString());
        });

        it('token URI can be changed by changing the base URI', async function () {
          await this.token.setBaseURI(baseURI);
          const newBaseURI = 'https://api.example.com/v2/';
          await this.token.setBaseURI(newBaseURI);
          expect(await this.token.tokenURI(firstTokenId)).to.equal(newBaseURI + firstTokenId.toString());
        });
      });
    });
  });
}