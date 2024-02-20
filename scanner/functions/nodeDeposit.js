async function nodeDeposit(txOptions) {

    // Load contracts
    const [
        rocketMinipoolFactory,
        rocketNodeDeposit,
        rocketStorage,
    ] = await Promise.all([
        RocketMinipoolFactory.deployed(),
        RocketNodeDeposit.deployed(),
        RocketStorage.deployed()
    ]);

    const salt = minipoolSalt++;
    const minipoolAddress = (await rocketMinipoolFactory.getExpectedAddress(txOptions.from, salt)).substr(2);
    let withdrawalCredentials = '0x010000000000000000000000' + minipoolAddress;

    // Get validator deposit data
    let depositData = {
        pubkey: getValidatorPubkey(),
        withdrawalCredentials: Buffer.from(withdrawalCredentials.substr(2), 'hex'),
        amount: BigInt(1000000000), // 1 ETH in gwei
        signature: getValidatorSignature(),
    };

    let depositDataRoot = getDepositDataRoot(depositData);

    // Make node deposit
    await rocketNodeDeposit.deposit(txOptions.value, '0'.ether, depositData.pubkey, depositData.signature, depositDataRoot, salt, '0x' + minipoolAddress, txOptions);
}