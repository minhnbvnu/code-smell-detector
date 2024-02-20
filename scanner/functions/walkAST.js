function walkAST(ast, callback) {
        var pre = function (cur, parent, walker) {
            var path = walker.state;
            path.push(cur);
            callback(path, walker);
            return cur;
        };
        var post = function (cur, parent, walker) {
            var path = walker.state;
            path.pop();
            return cur;
        };
        var path = new AstPath();
        TypeScript.getAstWalkerFactory().walk(ast, pre, post, null, path);
    }