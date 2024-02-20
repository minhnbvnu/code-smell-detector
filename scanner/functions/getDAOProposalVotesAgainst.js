async function getDAOProposalVotesAgainst(proposalID, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    return await rocketDAOProposal.getVotesAgainst.call(proposalID);
}