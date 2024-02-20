function parseRewardsMap(rewards) {

  // Transform input into a mapping of address => { address, network, amountRPL, amountETH }
  const dataByAddress = rewards.reduce((memo, { address, network, trustedNodeRPL, nodeRPL, nodeETH }) => {
    if (!web3.utils.isAddress(address)) {
      throw new Error(`Found invalid address: ${address}`);
    }

    memo[address] = {
      address: web3.utils.toChecksumAddress(address),
      amountRPL: nodeRPL.add(trustedNodeRPL),
      amountETH: nodeETH,
      network: network.BN,
    };
    return memo;
  }, {});

  const rewardsPerNetworkBN = rewards.reduce((perNetwork, {network, trustedNodeRPL, nodeRPL, nodeETH}) => {
    if(!(network in perNetwork)){
      perNetwork[network] = {
        RPL: '0'.BN,
        ETH: '0'.BN,
      };
    }
    perNetwork[network].RPL = perNetwork[network].RPL.add(nodeRPL.add(trustedNodeRPL));
    perNetwork[network].ETH = perNetwork[network].ETH.add(nodeETH);
    return perNetwork;
  }, {})


  const rewardsPerNetworkRPL = {}
  const rewardsPerNetworkETH = {}
  Object.keys(rewardsPerNetworkBN).map(network => rewardsPerNetworkRPL[network] = rewardsPerNetworkBN[network].RPL.toString());
  Object.keys(rewardsPerNetworkBN).map(network => rewardsPerNetworkETH[network] = rewardsPerNetworkBN[network].ETH.toString());

  // Sort
  const sortedAddresses = Object.keys(dataByAddress).sort();

  // Construct a tree
  const tree = new RewardClaimTree(
    sortedAddresses.map((address) => ({
      address: dataByAddress[address].address,
      network: dataByAddress[address].network,
      amountRPL: dataByAddress[address].amountRPL,
      amountETH: dataByAddress[address].amountETH
    }))
  );

  // Generate claims
  const claims = sortedAddresses.reduce((memo, _address) => {
    const { address, network, amountRPL, amountETH } = dataByAddress[_address];
    memo[address] = {
      network: Number(network),
      amountRPL: amountRPL.toString(),
      amountETH: amountETH.toString(),
      proof: tree.getProof(address, network, amountRPL, amountETH),
      leaf: RewardClaimTree.toNode(address, network, amountRPL, amountETH).toString('hex')
    };
    return memo;
  }, {});

  const totalRewardsRPL = sortedAddresses.reduce(
    (memo, key) => memo.add(dataByAddress[key].amountRPL),
    '0'.BN
  );

  const totalRewardsETH = sortedAddresses.reduce(
    (memo, key) => memo.add(dataByAddress[key].amountETH),
    '0'.BN
  );

  return {
    tree: tree,
    proof: {
      merkleRoot: tree.getHexRoot(),
      rewardsPerNetworkRPL: rewardsPerNetworkRPL,
      rewardsPerNetworkETH: rewardsPerNetworkETH,
      totalRewardsRPL: totalRewardsRPL.toString(),
      totalRewardsETH: totalRewardsETH.toString(),
      claims,
    }
  };
}