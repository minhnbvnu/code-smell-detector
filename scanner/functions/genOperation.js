function genOperation(target, value, data, predecessor, salt) {
  const id = ethers.keccak256(
    ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'bytes', 'uint256', 'bytes32'],
      [getAddress(target), value, data, predecessor, salt],
    ),
  );
  return { id, target, value, data, predecessor, salt };
}