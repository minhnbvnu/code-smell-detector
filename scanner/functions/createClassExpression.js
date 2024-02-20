function createClassExpression(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(228 /* ClassExpression */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.heritageClauses) | propagateChildrenFlags(node.members) | (node.typeParameters ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.jsDoc = void 0;
                return node;
            }