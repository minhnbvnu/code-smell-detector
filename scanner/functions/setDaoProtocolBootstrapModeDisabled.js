async function setDaoProtocolBootstrapModeDisabled(txOptions) {
    // Load contracts
    const rocketDAOProtocol = await RocketDAOProtocol.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProtocol.getBootstrapModeDisabled.call(),
        ]).then(
            ([bootstrapmodeDisabled]) =>
            ({bootstrapmodeDisabled})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // Set as a bootstrapped member
    await rocketDAOProtocol.bootstrapDisable(true, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check ID has been recorded
    assert.strictEqual(ds2.bootstrapmodeDisabled, true, 'Bootstrap mode was not disabled');
}