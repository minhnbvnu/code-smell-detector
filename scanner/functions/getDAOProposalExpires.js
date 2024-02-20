async function getDAOProposalExpires(proposalID, txOptions) {
  // Load contracts
  const rocketDAOProposal = await RocketDAOProposal.deployed();
  return await rocketDAOProposal.getExpires.call(proposalID);
}