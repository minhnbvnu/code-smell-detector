async function daoNodeTrustedMemberChallengeMake(_nodeAddress, txOptions) {
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

    // Capture data
    let ds1 = await getTxData();

    // Add a new proposal
    await rocketDAONodeTrustedActions.actionChallengeMake(_nodeAddress, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check member count has increased
    assert.strictEqual(ds1.currentMemberStatus, true, 'Challenged member has had their membership removed');
    assert.strictEqual(ds1.memberChallengedStatus, false, 'Challenged a member that was already challenged');
    assert.strictEqual(ds2.memberChallengedStatus, true, 'Member did not become challenged');
}