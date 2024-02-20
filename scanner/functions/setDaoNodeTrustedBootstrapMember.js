async function setDaoNodeTrustedBootstrapMember(_id, _url, _nodeAddress, txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrusted.getMemberID.call(_nodeAddress),
        ]).then(
            ([memberID]) =>
            ({memberID})
        );
    }

    // Set as a bootstrapped member
    await rocketDAONodeTrusted.bootstrapMember(_id, _url, _nodeAddress, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check ID has been recorded
    assert.strictEqual(ds2.memberID, _id, 'Member was not invited to join correctly');
}