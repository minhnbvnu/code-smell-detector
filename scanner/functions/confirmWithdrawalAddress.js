async function confirmWithdrawalAddress(nodeAddress, txOptions) {
    // Load contracts
    const rocketStorage = await RocketStorage.deployed();

    // Confirm withdrawal address
    await rocketStorage.confirmWithdrawalAddress(nodeAddress, txOptions);

    // Get current & pending withdrawal addresses
    let nodeWithdrawalAddress = await rocketStorage.getNodeWithdrawalAddress.call(nodeAddress);
    let nodePendingWithdrawalAddress = await rocketStorage.getNodePendingWithdrawalAddress.call(nodeAddress);

    // Check
    assert.strictEqual(nodeWithdrawalAddress, txOptions.from, 'Incorrect updated withdrawal address');
    assert.strictEqual(nodePendingWithdrawalAddress, '0x0000000000000000000000000000000000000000', 'Incorrect pending withdrawal address');
}