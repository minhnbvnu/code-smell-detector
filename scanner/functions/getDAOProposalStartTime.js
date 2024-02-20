async function getDAOProposalStartTime(proposalID, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    return await rocketDAOProposal.getStart.call(proposalID);
}