async function displayInfoHeader(width = 0) {
    const genesisBlock = await jsonRpcFetch('getBlockByNumber', 1);
    const blockNumber = await jsonRpcFetch('blockNumber');
    const peerCount = await jsonRpcFetch('peerCount');
    const consensus = await jsonRpcFetch('consensus');
    const {color, chain} = genesisInfo(genesisBlock.hash);
    //const state = syncing ? `Syncing. [${Math.round(100 * (syncing.currentBlock - syncing.startingBlock) / (syncing.highestBlock - syncing.startingBlock))}%]` : 'On sync.';
    const state = consensus === 'established' ? 'Consensus established.' : consensus === 'syncing' ? 'Syncing...' : consensus === 'lost' ? 'Consensus lost.' : 'Unknown state.';
    const descr = chalk`${peerCount} peers | ⛃ ${blockNumber} | ${state}`;
    if (chain !== 'main') {
        const chainPrefix = chalk.keyword('black').bgKeyword(color)(` ${chain}-net `) + ' ';
        const widthBefore = chain.length + 15 + descr.length;
        const placeHolder = Array(Math.max(0, Math.round((width - widthBefore) / 2))).join(' ');
        console.log(chalk`${placeHolder}${chainPrefix}{keyword("gold") Nimiq} | ${descr}${placeHolder}`);
        if (width <= widthBefore) width = widthBefore + 1;
    } else {
        const widthBefore = descr.length + 8;
        const placeHolder = Array(Math.max(0, Math.round((width - widthBefore) / 2))).join(' ');
        console.log(chalk`${placeHolder}{keyword("gold") Nimiq} | ${descr}${placeHolder}`);
        if (width <= widthBefore) width = widthBefore + 1;
    }
    console.log(Array(width).join('⎺'));
}