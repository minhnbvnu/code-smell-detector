async function displayAccount(account, name, head) {
    if (!account) {
        console.log(chalk`Account {bold ${name}} not found.`);
    }
    if (!head && account.type !== Nimiq.Account.Type.BASIC) {
        head = await jsonRpcFetch('getBlockByNumber', 'latest');
    }
    console.log(chalk`Account {bold ${account.address}}:`);
    console.log(`Type          | ${accountTypeName(account.type)}`);
    console.log(`Balance       | ${nimValueFormat(account.balance)}`);
    if (account.type === Nimiq.Account.Type.VESTING) {
        console.log(`Vested amount | ${nimValueFormat(account.vestingTotalAmount)}`);
        console.log(`Vesting start | ${blockNumberFormat(account.vestingStart, head)}`);
        console.log(`Vesting step  | ${nimValueFormat(account.vestingStepAmount)} every ${blockAmountFormat(account.vestingStepBlocks)}`);
        if (account.vestingStart + Math.ceil(account.vestingTotalAmount / account.vestingStepAmount) * account.vestingStepBlocks > head.number) {
            let nextVestingBlockNumber = account.vestingStart + account.vestingStepBlocks;
            while (nextVestingBlockNumber < head.number) nextVestingBlockNumber += account.vestingStepBlocks;
            const nextVestingAmount = Math.min(account.vestingStepAmount, account.vestingTotalAmount - Math.floor((head.number - account.vestingStart) / account.vestingStepBlocks) * account.vestingStepAmount);
            console.log(`Next vesting  | ${nimValueFormat(nextVestingAmount)} at ${blockNumberFormat(nextVestingBlockNumber, head)}`);
        } else {
            console.log(chalk`Next vesting  | {italic Fully vested}`);
        }
    } else if (account.type === Nimiq.Account.Type.HTLC) {
        console.log(`Sender        | ${account.senderAddress}`);
        console.log(`Recipient     | ${account.recipientAddress}`);
        console.log(`Locked amount | ${nimValueFormat(account.totalAmount)}`);
        console.log(`Timeout       | ${blockNumberFormat(account.timeout, head)}`);
        console.log(`Hash depth    | ${account.hashCount}`);
        console.log(`Hash root     | ${account.hashRoot}`);
    }

}