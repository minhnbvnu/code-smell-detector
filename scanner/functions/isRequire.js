function isRequire(decl) {
                return decl.init && decl.init.type === "CallExpression" && decl.init.callee.name === "require";
            }