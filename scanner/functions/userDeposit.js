async function userDeposit(txOptions) {
    const rocketDepositPool = await RocketDepositPool.deployed();
    await rocketDepositPool.deposit(txOptions);
}