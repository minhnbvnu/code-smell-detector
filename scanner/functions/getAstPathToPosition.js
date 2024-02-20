function getAstPathToPosition(script, pos, options) {
        if (typeof options === "undefined") { options = GetAstPathOptions.Default; }
        var lookInComments = function (comments) {
            if(comments && comments.length > 0) {
                for(var i = 0; i < comments.length; i++) {
                    var minChar = comments[i].minChar;
                    var limChar = comments[i].limChar;
                    if(!comments[i].isBlockComment) {
                        limChar++;
                    }
                    if(pos >= minChar && pos < limChar) {
                        ctx.path.push(comments[i]);
                    }
                }
            }
        };
        var pre = function (cur, parent, walker) {
            if(isValidAstNode(cur)) {
                var inclusive = TypeScript.hasFlag(options, GetAstPathOptions.EdgeInclusive) || cur.nodeType === TypeScript.NodeType.Name || pos === script.limChar;
                var minChar = cur.minChar;
                var limChar = cur.limChar + (inclusive ? 1 : 0);
                if(pos >= minChar && pos < limChar) {
                    var previous = ctx.path.ast();
                    if(previous == null || (cur.minChar >= previous.minChar && cur.limChar <= previous.limChar)) {
                        ctx.path.push(cur);
                    } else {
                    }
                }
                if(pos < limChar) {
                    lookInComments(cur.preComments);
                }
                if(pos >= minChar) {
                    lookInComments(cur.postComments);
                }
                if(!TypeScript.hasFlag(options, GetAstPathOptions.DontPruneSearchBasedOnPosition)) {
                    walker.options.goChildren = (minChar <= pos && pos <= limChar);
                }
            }
            return cur;
        };
        var ctx = new AstPathContext();
        TypeScript.getAstWalkerFactory().walk(script, pre, null, null, ctx);
        return ctx.path;
    }