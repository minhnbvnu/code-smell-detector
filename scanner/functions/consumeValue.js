function consumeValue(tokens, untilTest) {
            var out;
            untilTest == null && (untilTest = '');
            out = '';
            while (tokens.length && -1 === untilTest.indexOf(tokens[0])) {
                out += tokens.shift();
            }
            return out;
        }