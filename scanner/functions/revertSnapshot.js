function revertSnapshot(web3, snapshotId) {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_revert',
            params: [snapshotId],
            id: (new Date()).getTime(),
        }, function(err, response) {
            if (err) { reject(err); }
            else { resolve(); }
        });
    });
}