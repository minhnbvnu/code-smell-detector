function takeSnapshot(web3) {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_snapshot',
            id: (new Date()).getTime(),
        }, function(err, response) {
            if (err) { reject(err); }
            else if (response && response.result) { resolve(response.result); }
            else { reject('Unknown error'); }
        });
    });
}