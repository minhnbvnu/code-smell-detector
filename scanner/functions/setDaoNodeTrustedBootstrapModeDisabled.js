async function setDaoNodeTrustedBootstrapModeDisabled(txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrusted.getBootstrapModeDisabled.call(),
        ]).then(
            ([bootstrapmodeDisabled]) =>
            ({bootstrapmodeDisabled})
        );
    }

    // Set as a bootstrapped member
    await rocketDAONodeTrusted.bootstrapDisable(true, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check ID has been recorded
    assert.strictEqual(ds2.bootstrapmodeDisabled, true, 'Bootstrap mode was not disabled');
}