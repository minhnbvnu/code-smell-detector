async function checkEstablished() {
            establishedCount++;
            if (establishedCount === 2) {
                const netconfig3 = new RtcNetworkConfig();
                consensus3 = await Consensus.volatileLight(netconfig3);
                consensus3.network.connect();
                consensus3.on('established', checkEstablished);
            } else if (establishedCount === 3) {
                expect(consensus3._agents.length).toBe(2);
                done();
            }
        }