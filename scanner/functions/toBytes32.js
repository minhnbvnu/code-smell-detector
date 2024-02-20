function toBytes32(type, value) {
  switch (type) {
    case 'bytes32':
      return value;
    case 'uint256':
      return `bytes32(${value})`;
    case 'address':
      return `bytes32(uint256(uint160(${value})))`;
    default:
      throw new Error(`Conversion from ${type} to bytes32 not supported`);
  }
}