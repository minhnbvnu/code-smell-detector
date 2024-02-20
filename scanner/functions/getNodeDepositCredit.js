async function getNodeDepositCredit(nodeAddress) {
    const rocketNodeDeposit = await RocketNodeDeposit.deployed();
    let credit = await rocketNodeDeposit.getNodeDepositCredit(nodeAddress);
    return credit;
}