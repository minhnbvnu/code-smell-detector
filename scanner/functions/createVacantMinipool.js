async function createVacantMinipool(bondAmount, txOptions, salt = null, currentBalance = '32'.ether, pubkey = null) {
    // Load contracts
    const [
        rocketMinipoolFactory,
        rocketNodeDeposit,
        rocketNodeStaking,
        rocketStorage,
    ] = await Promise.all([
        RocketMinipoolFactory.deployed(),
        RocketNodeDeposit.deployed(),
        RocketNodeStaking.deployed(),
        RocketStorage.deployed()
    ]);

    if (salt === null){
        salt = minipoolSalt++;
    }

    if (pubkey === null){
        pubkey = getValidatorPubkey();
    }

    const minipoolAddress = (await rocketMinipoolFactory.getExpectedAddress(txOptions.from, salt)).substr(2);

    const ethMatched1 = await rocketNodeStaking.getNodeETHMatched(txOptions.from);
    await rocketNodeDeposit.createVacantMinipool(bondAmount, '0'.ether, pubkey, salt, '0x' + minipoolAddress, currentBalance, txOptions);
    const ethMatched2 = await rocketNodeStaking.getNodeETHMatched(txOptions.from);

    // Expect node's ETH matched to be increased by (32 - bondAmount)
    assertBN.equal(ethMatched2.sub(ethMatched1), '32'.ether.sub(bondAmount), 'Incorrect ETH matched');

    return RocketMinipoolDelegate.at('0x' + minipoolAddress);
}