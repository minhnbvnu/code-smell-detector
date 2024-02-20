function shouldSupportInterfaces(interfaces = []) {
  interfaces.unshift('ERC165');

  describe('ERC165', function () {
    beforeEach(function () {
      this.contractUnderTest = this.mock || this.token;
    });

    describe('when the interfaceId is supported', function () {
      it('uses less than 30k gas', async function () {
        for (const k of interfaces) {
          const interface = INTERFACE_IDS[k] ?? k;
          expect(await this.contractUnderTest.supportsInterface.estimateGas(interface)).to.lte(30_000n);
        }
      });

      it('returns true', async function () {
        for (const k of interfaces) {
          const interfaceId = INTERFACE_IDS[k] ?? k;
          expect(await this.contractUnderTest.supportsInterface(interfaceId), `does not support ${k}`).to.be.true;
        }
      });
    });

    describe('when the interfaceId is not supported', function () {
      it('uses less than 30k', async function () {
        expect(await this.contractUnderTest.supportsInterface.estimateGas(INVALID_ID)).to.lte(30_000n);
      });

      it('returns false', async function () {
        expect(await this.contractUnderTest.supportsInterface(INVALID_ID), `supports ${INVALID_ID}`).to.be.false;
      });
    });

    it('all interface functions are in ABI', async function () {
      for (const k of interfaces) {
        // skip interfaces for which we don't have a function list
        if (SIGNATURES[k] === undefined) continue;

        // Check the presence of each function in the contract's interface
        for (const fnSig of SIGNATURES[k]) {
          expect(this.contractUnderTest.interface.hasFunction(fnSig), `did not find ${fnSig}`).to.be.true;
        }
      }
    });
  });
}