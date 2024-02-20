function established(name, fn) {
        allit(name, (done, client, consensus) => {
            client
                .waitForConsensusEstablished()
                .then(() => fn(done, client, consensus));
        });
    }