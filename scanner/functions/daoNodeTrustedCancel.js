async function daoNodeTrustedCancel(_proposalID, txOptions) {
    // Load contracts
    const rocketDAONodeTrustedProposals = await RocketDAONodeTrustedProposals.deployed();

    // Add a new proposal
    await rocketDAONodeTrustedProposals.cancel(_proposalID, txOptions);

    // Get the current state
    let state = Number(await getDAOProposalState(_proposalID));

    // Check proposals
    assert.strictEqual(state, proposalStates.Cancelled, 'Incorrect proposal state, should be cancelled');
}