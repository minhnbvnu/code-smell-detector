function createVariableDeclarationList(declarations, flags2 = 0 /* None */) {
                const node = createBaseNode(258 /* VariableDeclarationList */);
                node.flags |= flags2 & 3 /* BlockScoped */;
                node.declarations = createNodeArray(declarations);
                node.transformFlags |= propagateChildrenFlags(node.declarations) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                if (flags2 & 3 /* BlockScoped */) {
                    node.transformFlags |= 1024 /* ContainsES2015 */ | 262144 /* ContainsBlockScopedBinding */;
                }
                return node;
            }