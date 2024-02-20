async function displayTransaction(transaction, hashOrNumber, index, beforeSend) {
    if (!transaction) {
        if (typeof index !== 'undefined') {
            console.log(chalk`Block {bold ${hashOrNumber}} not found or has less than {bold ${index - 1}} transactions.`);
        } else {
            console.log(chalk`Transaction {bold ${hashOrNumber}} not found.`);
        }
        return;
    }
    let block = null;
    if (transaction.blockHash) block = await jsonRpcFetch('getBlockByHash', transaction.blockHash);
    if (!beforeSend) {
        console.log(chalk`Transaction {bold ${transaction.hash}}:`);
    } else {
        console.log(chalk`Transaction to send:`);
    }
    console.log(`From          | ${transaction.fromAddress}`);
    console.log(`To            | ${transaction.toAddress}`);
    if (block) {
        console.log(`Timestamp     | ${new Date(block.timestamp * 1000).toString()}`);
    } else if (!beforeSend) {
        console.log(chalk`Timestamp     | {italic Pending...}`);
    }
    console.log(`Amount        | ${nimValueFormat(transaction.value)}`);
    console.log(`Fee           | ${nimValueFormat(transaction.fee)}`);
    console.log(`Data          | ${transaction.data}`);
    if (block) {
        console.log(`In block      | ${block.number} (index ${transaction.transactionIndex})`);
        console.log(`Confirmations | ${transaction.confirmations}`);
    } else if (!beforeSend) {
        console.log(chalk`In block      | {italic Pending...}`);
        console.log('Confirmations | 0');
    }
}