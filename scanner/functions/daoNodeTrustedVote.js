async function daoNodeTrustedVote(_proposalID, _vote, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    const rocketDAONodeTrustedProposals = await RocketDAONodeTrustedProposals.deployed();

    // Get data about the tx
    function getTxData() {
        return Promise.all([
            rocketDAOProposal.getTotal.call(),
            rocketDAOProposal.getState.call(_proposalID),
            rocketDAOProposal.getVotesFor.call(_proposalID),
            rocketDAOProposal.getVotesRequired.call(_proposalID),
        ]).then(
            ([proposalTotal, proposalState, proposalVotesFor, proposalVotesRequired]) =>
            ({proposalTotal, proposalState, proposalVotesFor, proposalVotesRequired})
        );
    }

    // Add a new proposal
    await rocketDAONodeTrustedProposals.vote(_proposalID, _vote, txOptions);

    // Capture data
    let ds2 = await getTxData();

    // Check proposals
    if(ds2.proposalState === proposalStates.Active) {
        assertBN.isBelow(ds2.proposalVotesFor, ds2.proposalVotesRequired, 'Proposal state is active, votes for proposal should be less than the votes required');
    }
    if(ds2.proposalState === proposalStates.Succeeded) {
        assertBN.isAtLeast(ds2.proposalVotesFor, ds2.proposalVotesRequired, 'Proposal state is successful, yet does not have the votes required');
    }
}