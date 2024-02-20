function eatWhitespace() {
            var start = pos;
            while (whiteRe.test(peek())) {
                pos++;
            }
            return pos !== start;
        }