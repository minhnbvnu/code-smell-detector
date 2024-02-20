function createIdentity() {
  const pair = generatePair();

  return {
    name: "Node " + pair.publicKey.substr(0, 10),
    ...pair
  };
}