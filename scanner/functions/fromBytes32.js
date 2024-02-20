function fromBytes32(type, value) {
  switch (type) {
    case 'bytes32':
      return value;
    case 'uint256':
      return `uint256(${value})`;
    case 'address':
      return `address(uint160(uint256(${value})))`;
    default:
      throw new Error(`Conversion from bytes32 to ${type} not supported`);
  }
}