function trySubstituteClassAlias(node) {
                if (classAliases) {
                    if (resolver.getNodeCheckFlags(node) & 2097152 /* ConstructorReferenceInClass */) {
                        const declaration = resolver.getReferencedValueDeclaration(node);
                        if (declaration) {
                            const classAlias = classAliases[declaration.id];
                            if (classAlias) {
                                const clone2 = factory2.cloneNode(classAlias);
                                setSourceMapRange(clone2, node);
                                setCommentRange(clone2, node);
                                return clone2;
                            }
                        }
                    }
                }
                return void 0;
            }