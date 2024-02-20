function timingsCloseTo(actual, expected) {
        // E.g. Chrome51 can count timings as 29.196999988926102, but IE11 and FF47 counts 29.1969999889261.
        // Which seems to be 13 decimal places.
        // Here delta is 6 decimal places, but surely enough to be satisfied?
        var delta = 0.000001;
        assert.closeTo(actual.blocked, expected.blocked, delta, "blocked");
        assert.closeTo(actual.dns, expected.dns, delta, "dns");
        assert.closeTo(actual.ssl, expected.ssl, delta, "ssl");
        assert.closeTo(actual.connect, expected.connect, delta, "connect");
        assert.closeTo(actual.send, expected.send, delta, "send");
        assert.closeTo(actual.wait, expected.wait, delta, "wait");
        assert.closeTo(actual.receive, expected.receive, delta, "receive");
    }