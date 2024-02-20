async function getDomain(contract) {
  const { fields, name, version, chainId, verifyingContract, salt, extensions } = await contract.eip712Domain();

  if (extensions.length > 0) {
    throw Error('Extensions not implemented');
  }

  const domain = {
    name,
    version,
    chainId,
    verifyingContract,
    salt,
  };

  for (const [i, { name }] of types.EIP712Domain.entries()) {
    if (!(fields & (1 << i))) {
      delete domain[name];
    }
  }

  return domain;
}