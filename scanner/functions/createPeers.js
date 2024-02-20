async function createPeers(count, seedAddress) {
            while (count-- > 0) {
                const netConfig = new RtcNetworkConfig();
                const consensus = await Consensus.volatileNano(netConfig);
                consensus.network._connections.connectOutbound(seedAddress);
                await new Promise(resolve => consensus.on('established', resolve));
            }
        }