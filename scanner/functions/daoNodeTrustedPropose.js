async function daoNodeTrustedPropose(_proposalMessage, _payload, txOptions) {

    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    const rocketDAONodeTrustedProposals = await RocketDAONodeTrustedProposals.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProposal.getTotal.call(),
        ]).then(
            ([proposalTotal]) =>
            ({proposalTotal})
        );
    }

    // Capture data
    let ds1 = await getTxData();

    // Add a new proposal
    await rocketDAONodeTrustedProposals.propose(_proposalMessage, _payload, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Get the current state, new proposal should be in pending
    let state = Number(await getDAOProposalState(ds2.proposalTotal));

    // Check proposals
    assertBN.equal(ds2.proposalTotal, ds1.proposalTotal.add('1'.BN), 'Incorrect proposal total count');
    assert.strictEqual(state, proposalStates.Pending, 'Incorrect proposal state, should be pending');
    
    // Return the proposal ID
    return Number(ds2.proposalTotal);
}