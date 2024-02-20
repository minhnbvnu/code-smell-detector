async function stakeMinipool(minipool, txOptions) {

    // Get contracts
    const rocketMinipoolManager = await RocketMinipoolManager.deployed();

    // Get minipool validator pubkey
    const validatorPubkey = await rocketMinipoolManager.getMinipoolPubkey(minipool.address);

    // Get minipool withdrawal credentials
    let withdrawalCredentials = await rocketMinipoolManager.getMinipoolWithdrawalCredentials.call(minipool.address);

    // Check if legacy or new minipool
    let legacy = !(await minipool.getDepositType()).eq('4'.BN);

    // Get validator deposit data
    let depositData;

    if (legacy) {
        depositData = {
            pubkey: Buffer.from(validatorPubkey.substr(2), 'hex'),
            withdrawalCredentials: Buffer.from(withdrawalCredentials.substr(2), 'hex'),
            amount: BigInt(16000000000), // gwei
            signature: getValidatorSignature(),
        };
    } else {
        depositData = {
            pubkey: Buffer.from(validatorPubkey.substr(2), 'hex'),
            withdrawalCredentials: Buffer.from(withdrawalCredentials.substr(2), 'hex'),
            amount: BigInt(31000000000), // gwei
            signature: getValidatorSignature(),
        };
    }
    let depositDataRoot = getDepositDataRoot(depositData);

    // Stake
    await minipool.stake(depositData.signature, depositDataRoot, txOptions);

}