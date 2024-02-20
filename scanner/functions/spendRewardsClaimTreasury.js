async function spendRewardsClaimTreasury(_invoiceID, _recipientAddress, _amount, txOptions) {
    // Load contracts
    const rocketDAOProtocol = await RocketDAOProtocol.deployed();
    const rocketTokenRPL = await RocketTokenRPL.deployed();
    const rocketVault = await RocketVault.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketVault.balanceOfToken('rocketClaimDAO', rocketTokenRPL.address),
            rocketTokenRPL.balanceOf(_recipientAddress),
        ]).then(
            ([daoClaimTreasuryBalance, recipientBalance]) =>
            ({daoClaimTreasuryBalance, recipientBalance})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // console.log(web3.utils.fromWei(ds1.daoClaimTreasuryBalance), web3.utils.fromWei(ds1.recipientBalance), web3.utils.fromWei(_amount));

    // Perform tx
    await rocketDAOProtocol.bootstrapSpendTreasury(_invoiceID, _recipientAddress, _amount, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // console.log(web3.utils.fromWei(ds2.daoClaimTreasuryBalance), web3.utils.fromWei(ds2.recipientBalance), web3.utils.fromWei(_amount));

    // Verify the amount sent is correct
    assertBN.equal(ds2.recipientBalance, ds1.recipientBalance.add(_amount), "Amount spent by treasury does not match recipients received amount");
}