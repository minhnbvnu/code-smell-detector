function createModuleDeclaration(modifiers, name, body, flags2 = 0 /* None */) {
                const node = createBaseDeclaration(264 /* ModuleDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.flags |= flags2 & (16 /* Namespace */ | 4 /* NestedNamespace */ | 1024 /* GlobalAugmentation */);
                node.name = name;
                node.body = body;
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.name) | propagateChildFlags(node.body) | 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }