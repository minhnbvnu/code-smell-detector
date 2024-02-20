async function getDepositExcessBalance() {
	const rocketDepositPool = await RocketDepositPool.deployed();
	let excessBalance = await rocketDepositPool.getExcessBalance.call();
	return excessBalance;
}