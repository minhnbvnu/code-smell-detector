function walkListChildren(preAst, parent, walker) {
            var len = preAst.members.length;
            if(walker.options.reverseSiblings) {
                for(var i = len - 1; i >= 0; i--) {
                    if(walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            } else {
                for(var i = 0; i < len; i++) {
                    if(walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
        }