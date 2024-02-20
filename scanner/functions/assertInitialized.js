async function assertInitialized({ value, balance }) {
      const beaconAddress = await getAddressInSlot(this.proxy, BeaconSlot);
      expect(beaconAddress).to.equal(this.beacon);

      const dummy = this.v1.attach(this.proxy);
      expect(await dummy.value()).to.equal(value);

      expect(await ethers.provider.getBalance(this.proxy)).to.equal(balance);
    }