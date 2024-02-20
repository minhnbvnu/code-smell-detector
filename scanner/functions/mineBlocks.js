async function mineBlocks(web3, numBlocks) {
    for (let i = 0; i < numBlocks; ++i) {
        await new Promise((resolve, reject) => {
            web3.currentProvider.send({
                jsonrpc: '2.0',
                method: 'evm_mine',
                id: (new Date()).getTime(),
            }, function(err, response) {
                if (err) { reject(err); }
                else { resolve(); }
            });
        });
    }
}