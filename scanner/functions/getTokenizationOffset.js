function getTokenizationOffset(script, position) {
        var bestOffset = 0;
        var pre = function (cur, parent, walker) {
            if(TypeScript.isValidAstNode(cur)) {
                if(cur.minChar <= position) {
                    bestOffset = max(bestOffset, cur.minChar);
                }
                if(cur.minChar > position || cur.limChar < bestOffset) {
                    walker.options.goChildren = false;
                }
            }
            return cur;
        };
        TypeScript.getAstWalkerFactory().walk(script, pre);
        return bestOffset;
    }