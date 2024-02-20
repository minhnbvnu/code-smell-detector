async function getDAOProposalVotesFor(proposalID, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    return await rocketDAOProposal.getVotesFor.call(proposalID);
}