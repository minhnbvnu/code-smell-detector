function testInline(re) {
            return stream.match(re) && testBackward(/\W/) && testForward(/\W/);
        }