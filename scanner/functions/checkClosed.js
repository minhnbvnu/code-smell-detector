function checkClosed() {
            expect(MockNetwork._peerConnectionCounter).toBe(0);
            done();
        }