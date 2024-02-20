async function getDAONodeProposalQuorumVotesRequired(proposalID, txOptions) {
    // Load contracts
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    return await rocketDAONodeTrusted.getProposalQuorumVotesRequired.call();
}