function genesisInfo(hash) {
    let chain = 'private';
    let color = 'tomato';
    for (const c in Nimiq.GenesisConfig.CONFIGS) {
        if (hash === Nimiq.GenesisConfig.CONFIGS[c].GENESIS_BLOCK.hash().toHex()) {
            chain = c;
            color = 'gold';
        }
    }
    if (chain === 'main') color = 'dodgerblue';
    return {color, chain};
}