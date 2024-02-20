function AstWalkerCallback(pre, ast, callback) {
            var nodeType = ast.nodeType;
            var callbackString = (TypeScript.NodeType)._map[nodeType] + "Callback";
            if(callback[callbackString]) {
                return callback[callbackString](pre, ast);
            }
            if(callback.DefaultCallback) {
                return callback.DefaultCallback(pre, ast);
            }
            return true;
        }