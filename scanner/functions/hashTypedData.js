function hashTypedData(domain, structHash) {
  return ethers.solidityPackedKeccak256(
    ['bytes', 'bytes32', 'bytes32'],
    ['0x1901', ethers.TypedDataEncoder.hashDomain(domain), structHash],
  );
}