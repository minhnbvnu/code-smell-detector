async function increaseTime(web3, seconds) {
    await new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            params: [seconds],
            id: (new Date()).getTime(),
        }, function(err, response) {
            if (err) { reject(err); }
            else { resolve(); }
        });
    });
    // Mine a block using the new time
    await mineBlocks(web3, 1);
}