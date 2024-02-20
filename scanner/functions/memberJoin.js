async function memberJoin(txOptions) {
    const rocketDAONodeTrustedActions = await RocketDAONodeTrustedActions.deployed();
    await rocketDAONodeTrustedActions.actionJoin(txOptions);
}