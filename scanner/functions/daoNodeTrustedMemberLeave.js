async function daoNodeTrustedMemberLeave(_rplRefundAddress, txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    const rocketDAONodeTrustedActions = await RocketDAONodeTrustedActions.deployed();
    const rocketVault = await RocketVault.deployed();
    const rocketTokenRPL = await RocketTokenRPL.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAONodeTrusted.getMemberCount.call(),
            rocketTokenRPL.balanceOf(_rplRefundAddress),
            rocketVault.balanceOfToken('rocketDAONodeTrustedActions', rocketTokenRPL.address),
        ]).then(
            ([memberTotal, rplBalanceRefund, rplBalanceVault]) =>
            ({memberTotal, rplBalanceRefund, rplBalanceVault})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // Add a new proposal
    await rocketDAONodeTrustedActions.actionLeave(_rplRefundAddress, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Verify
    assertBN.equal(ds2.memberTotal, ds1.memberTotal.sub('1'.BN), 'Member count has not decreased');
    assertBN.equal(ds2.rplBalanceVault, ds1.rplBalanceVault.sub(ds2.rplBalanceRefund), 'Member RPL refund address does not contain the correct RPL bond amount');
}