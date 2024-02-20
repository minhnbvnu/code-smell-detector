async function setNodeWithdrawalAddress(nodeAddress, withdrawalAddress, txOptions) {
    const rocketStorage = await RocketStorage.deployed();
    await rocketStorage.setWithdrawalAddress(nodeAddress, withdrawalAddress, true, txOptions);
}