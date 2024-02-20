function appendReferenceToType(root, ref) {
                        if (isImportTypeNode(root)) {
                            let typeArguments = root.typeArguments;
                            let qualifier = root.qualifier;
                            if (qualifier) {
                                if (isIdentifier(qualifier)) {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier)) {
                                        qualifier = setIdentifierTypeArguments(factory.cloneNode(qualifier), typeArguments);
                                    }
                                }
                                else {
                                    if (typeArguments !== getIdentifierTypeArguments(qualifier.right)) {
                                        qualifier = factory.updateQualifiedName(qualifier, qualifier.left, setIdentifierTypeArguments(factory.cloneNode(qualifier.right), typeArguments));
                                    }
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                qualifier = qualifier ? factory.createQualifiedName(qualifier, id) : id;
                            }
                            return factory.updateImportTypeNode(root, root.argument, root.assertions, qualifier, typeArguments, root.isTypeOf);
                        }
                        else {
                            let typeArguments = root.typeArguments;
                            let typeName = root.typeName;
                            if (isIdentifier(typeName)) {
                                if (typeArguments !== getIdentifierTypeArguments(typeName)) {
                                    typeName = setIdentifierTypeArguments(factory.cloneNode(typeName), typeArguments);
                                }
                            }
                            else {
                                if (typeArguments !== getIdentifierTypeArguments(typeName.right)) {
                                    typeName = factory.updateQualifiedName(typeName, typeName.left, setIdentifierTypeArguments(factory.cloneNode(typeName.right), typeArguments));
                                }
                            }
                            typeArguments = ref.typeArguments;
                            const ids = getAccessStack(ref);
                            for (const id of ids) {
                                typeName = factory.createQualifiedName(typeName, id);
                            }
                            return factory.updateTypeReferenceNode(root, typeName, typeArguments);
                        }
                    }