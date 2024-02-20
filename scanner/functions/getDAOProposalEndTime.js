async function getDAOProposalEndTime(proposalID, txOptions) {
    // Load contracts
    const rocketDAOProposal = await RocketDAOProposal.deployed();
    return await rocketDAOProposal.getEnd.call(proposalID);
}