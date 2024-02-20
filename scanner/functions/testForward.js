function testForward(re) {
            return stream.eol() || stream.match(re, false);
        }