function getFirstTransformableStaticClassElement(node) {
                var _a2;
                const willTransformStaticElementsOfDecoratedClass = !legacyDecorators && languageVersion < 99 /* ESNext */ && classOrConstructorParameterIsDecorated(
                /*useLegacyDecorators*/
                false, node);
                const willTransformPrivateElementsOrClassStaticBlocks = languageVersion <= 9 /* ES2022 */;
                const willTransformInitializers = !useDefineForClassFields || languageVersion < 9 /* ES2022 */;
                if (willTransformStaticElementsOfDecoratedClass || willTransformPrivateElementsOrClassStaticBlocks) {
                    for (const member of node.members) {
                        if (willTransformStaticElementsOfDecoratedClass && classElementOrClassElementParameterIsDecorated(
                        /*useLegacyDecorators*/
                        false, member, node)) {
                            return (_a2 = firstOrUndefined(getDecorators(node))) != null ? _a2 : node;
                        }
                        else if (willTransformPrivateElementsOrClassStaticBlocks) {
                            if (isClassStaticBlockDeclaration(member)) {
                                return member;
                            }
                            else if (isStatic(member)) {
                                if (isPrivateIdentifierClassElementDeclaration(member) || willTransformInitializers && isInitializedProperty(member)) {
                                    return member;
                                }
                            }
                        }
                    }
                }
            }