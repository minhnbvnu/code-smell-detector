async function bootstrapMember(address, id, url, txOptions) {
    const rocketDAONodeTrusted = await RocketDAONodeTrusted.deployed();
    await rocketDAONodeTrusted.bootstrapMember(id, url, address, txOptions);
}