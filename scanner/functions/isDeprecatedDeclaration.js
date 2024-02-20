function isDeprecatedDeclaration(decl) {
            return !!(getCombinedNodeFlagsAlwaysIncludeJSDoc(decl) & 8192 /* Deprecated */);
        }