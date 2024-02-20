function getConsensus(consensus) {
        const name = 'volatile' + consensus.charAt(0).toUpperCase() + consensus.slice(1);
        const promise = Consensus[name]();
        promise.then((c) => {
            Log.d('Client.spec', `${consensus}-consensus uses ${c.network.config.peerAddress}`);
        });
        return promise;
    }