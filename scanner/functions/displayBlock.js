function displayBlock(block, hashOrNumber) {
    if (!block) {
        console.log(chalk`Block {bold ${hashOrNumber}} not found.`);
        return;
    }
    console.log(chalk`Block {bold ${block.hash}}:`);
    console.log(`Number      | ${block.number}`);
    console.log(`PoW-Hash    | ${block.pow}`);
    console.log(`Parent-Hash | ${block.parentHash}`);
    console.log(`Timestamp   | ${new Date(block.timestamp * 1000).toString()}`);
    console.log(`Difficulty  | ${block.difficulty}`);
    if (block.minerAddress) {
        console.log(`Size        | ${block.size} bytes (${block.transactions.length} transactions)`);
        console.log(`Miner       | ${block.minerAddress}`);
        console.log(`Extra       | ${block.extraData || null}`);
    }
}