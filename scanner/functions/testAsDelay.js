function testAsDelay(type, { before, after }) {
  beforeEach('define timestamp when delay takes effect', async function () {
    const timestamp = await time.clock.timestamp();
    this.delayEffect = timestamp + this.delay;
  });

  describe(`when ${type} delay has not taken effect yet`, function () {
    beforeEach(`set next block timestamp before ${type} takes effect`, async function () {
      await time.increaseTo.timestamp(this.delayEffect - 1n, !!before.mineDelay);
    });

    before();
  });

  describe(`when ${type} delay has taken effect`, function () {
    beforeEach(`set next block timestamp when ${type} takes effect`, async function () {
      await time.increaseTo.timestamp(this.delayEffect, !!after.mineDelay);
    });

    after();
  });
}