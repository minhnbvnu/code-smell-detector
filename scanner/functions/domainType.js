function domainType(domain) {
  return types.EIP712Domain.filter(({ name }) => domain[name] !== undefined);
}