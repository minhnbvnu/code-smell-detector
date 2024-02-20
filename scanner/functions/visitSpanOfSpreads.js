function visitSpanOfSpreads(chunk) {
                return map(chunk, visitExpressionOfSpread);
            }