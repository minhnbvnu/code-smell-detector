async function createMinipoolWithBondAmount(bondAmount, txOptions, salt = null) {
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

    // Get minipool contract bytecode
    let contractBytecode;

    if (salt === null){
        salt = minipoolSalt++;
    }

    let minipoolAddress = (await rocketMinipoolFactory.getExpectedAddress(txOptions.from, salt)).substr(2);

    let withdrawalCredentials = '0x010000000000000000000000' + minipoolAddress;

    // Make node deposit
    const ethMatched1 = await rocketNodeStaking.getNodeETHMatched(txOptions.from);

    // Get validator deposit data
    let depositData = {
        pubkey: getValidatorPubkey(),
        withdrawalCredentials: Buffer.from(withdrawalCredentials.substr(2), 'hex'),
        amount: BigInt(1000000000), // gwei
        signature: getValidatorSignature(),
    };

    let depositDataRoot = getDepositDataRoot(depositData);

    if (txOptions.value.eq(bondAmount)) {
        await rocketNodeDeposit.deposit(bondAmount, '0'.ether, depositData.pubkey, depositData.signature, depositDataRoot, salt, '0x' + minipoolAddress, txOptions);
    } else {
        await rocketNodeDeposit.depositWithCredit(bondAmount, '0'.ether, depositData.pubkey, depositData.signature, depositDataRoot, salt, '0x' + minipoolAddress, txOptions);
    }

    const ethMatched2 = await rocketNodeStaking.getNodeETHMatched(txOptions.from);

    // Expect node's ETH matched to be increased by (32 - bondAmount)
    assertBN.equal(ethMatched2.sub(ethMatched1), '32'.ether.sub(bondAmount), 'Incorrect ETH matched');

    return RocketMinipoolDelegate.at('0x' + minipoolAddress);
}