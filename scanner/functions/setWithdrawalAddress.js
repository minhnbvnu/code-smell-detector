async function setWithdrawalAddress(nodeAddress, withdrawalAddress, confirm, txOptions) {
    // Load contracts
    const rocketStorage = await RocketStorage.deployed();

    // Set withdrawal address
    await rocketStorage.setWithdrawalAddress(nodeAddress, withdrawalAddress, confirm, txOptions);

    // Get current & pending withdrawal addresses
    let nodeWithdrawalAddress = await rocketStorage.getNodeWithdrawalAddress.call(nodeAddress);
    let nodePendingWithdrawalAddress = await rocketStorage.getNodePendingWithdrawalAddress.call(nodeAddress);

    // Confirmed update check
    if (confirm) {
        assert.strictEqual(nodeWithdrawalAddress, withdrawalAddress, 'Incorrect updated withdrawal address');
    }

    // Unconfirmed update check
    else {
        assert.strictEqual(nodePendingWithdrawalAddress, withdrawalAddress, 'Incorrect updated pending withdrawal address');
    }
}