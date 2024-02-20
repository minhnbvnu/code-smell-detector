async function setStakeRPLForAllowed(caller, state, txOptions) {
    const [rocketNodeStaking] = await Promise.all([
        RocketNodeStaking.deployed(),
    ]);
    await rocketNodeStaking.setStakeRPLForAllowed(caller, state, txOptions);
}