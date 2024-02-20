async function setDaoNodeTrustedMemberRequired(_id, _url, txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    const rocketVault = await RocketVault.deployed();
    const rocketTokenRPL = await RocketTokenRPL.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrusted.getMemberCount.call(),
            rocketTokenRPL.balanceOf(txOptions.from),
            rocketVault.balanceOfToken('rocketDAONodeTrustedActions', rocketTokenRPL.address),
        ]).then(
            ([memberTotal, rplBalanceBond, rplBalanceVault]) =>
            ({memberTotal, rplBalanceBond, rplBalanceVault})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // Add a new proposal
    await rocketDAONodeTrusted.memberJoinRequired(_id, _url, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check member count has increased
    assertBN.equal(ds2.memberTotal, ds1.memberTotal.add('1'.BN), 'Member count has not increased');
    assertBN.equal(ds2.rplBalanceVault, ds1.rplBalanceVault.add(ds1.rplBalanceBond), 'RocketVault address does not contain the correct RPL bond amount');
}