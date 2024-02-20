function hasTypeScriptClassSyntax(node) {
                return !!(node.transformFlags & 8192 /* ContainsTypeScriptClassSyntax */);
            }