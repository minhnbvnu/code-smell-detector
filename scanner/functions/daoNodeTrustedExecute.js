async function daoNodeTrustedExecute(_proposalID, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    const rocketDAONodeTrustedProposals = await RocketDAONodeTrustedProposals.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProposal.getState.call(_proposalID),
        ]).then(
            ([proposalState]) =>
            ({proposalState})
        );
    }

    // Execute a proposal
    await rocketDAONodeTrustedProposals.execute(_proposalID, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check it was updated
    assertBN.equal(ds2.proposalState, proposalStates.Executed, 'Proposal is not in the executed state');
}