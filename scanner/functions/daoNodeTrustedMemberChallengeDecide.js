async function daoNodeTrustedMemberChallengeDecide(_nodeAddress, _expectedMemberStatus, txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    const rocketDAONodeTrustedActions = await RocketDAONodeTrustedActions.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrusted.getMemberIsValid.call(_nodeAddress),
            rocketDAONodeTrusted.getMemberIsChallenged.call(_nodeAddress),
          ]).then(
            ([currentMemberStatus, memberChallengedStatus]) =>
            ({currentMemberStatus, memberChallengedStatus})
        );
    }

    // Add a new proposal
    await rocketDAONodeTrustedActions.actionChallengeDecide(_nodeAddress, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check member count has increased
    assert.strictEqual(ds2.currentMemberStatus, _expectedMemberStatus, 'Challenged member did not become their expected status');
}