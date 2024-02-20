function concatenateDiagnosticMessageChains(headChain, tailChain) {
            let lastChain = headChain;
            while (lastChain.next) {
                lastChain = lastChain.next[0];
            }
            lastChain.next = [tailChain];
        }