function consumeList(tokens, arg$, hasDelimiters) {
            var open, close, result, untilTest;
            open = arg$[0], close = arg$[1];
            if (hasDelimiters) {
                consumeOp(tokens, open);
            }
            result = [];
            untilTest = "," + (hasDelimiters ? close : '');
            while (tokens.length && (hasDelimiters && tokens[0] !== close)) {
                result.push(consumeElement(tokens, untilTest));
                maybeConsumeOp(tokens, ',');
            }
            if (hasDelimiters) {
                consumeOp(tokens, close);
            }
            return result;
        }