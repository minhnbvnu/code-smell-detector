function genOperationBatch(targets, values, payloads, predecessor, salt) {
  const id = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ['address[]', 'uint256[]', 'bytes[]', 'uint256', 'bytes32'],
      [targets.map(getAddress), values, payloads, predecessor, salt],
    ),
  );
  return { id, targets, values, payloads, predecessor, salt };
}