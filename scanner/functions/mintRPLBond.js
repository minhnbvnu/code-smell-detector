async function mintRPLBond(owner, node) {

    // Load contracts
    const [
        rocketDAONodeTrustedActions,
        rocketDAONodeTrustedSettings,
    ] = await Promise.all([
        RocketDAONodeTrustedActions.deployed(),
        RocketDAONodeTrustedSettingsMembers.deployed(),
    ]);

    // Get RPL bond amount
    const bondAmount = await rocketDAONodeTrustedSettings.getRPLBond.call();

    // Mint RPL amount and approve DAO node contract to spend
    await mintRPL(owner, node, bondAmount);
    await approveRPL(rocketDAONodeTrustedActions.address, bondAmount, {from: node});

}