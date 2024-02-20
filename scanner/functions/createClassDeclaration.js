function createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(260 /* ClassDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.heritageClauses) | propagateChildrenFlags(node.members) | (node.typeParameters ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                    if (node.transformFlags & 8192 /* ContainsTypeScriptClassSyntax */) {
                        node.transformFlags |= 1 /* ContainsTypeScript */;
                    }
                }
                node.jsDoc = void 0;
                return node;
            }