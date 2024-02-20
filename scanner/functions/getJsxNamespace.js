function getJsxNamespace(location) {
                if (location) {
                    const file = getSourceFileOfNode(location);
                    if (file) {
                        if (isJsxOpeningFragment(location)) {
                            if (file.localJsxFragmentNamespace) {
                                return file.localJsxFragmentNamespace;
                            }
                            const jsxFragmentPragma = file.pragmas.get("jsxfrag");
                            if (jsxFragmentPragma) {
                                const chosenPragma = isArray(jsxFragmentPragma) ? jsxFragmentPragma[0] : jsxFragmentPragma;
                                file.localJsxFragmentFactory = parseIsolatedEntityName(chosenPragma.arguments.factory, languageVersion);
                                visitNode(file.localJsxFragmentFactory, markAsSynthetic, isEntityName);
                                if (file.localJsxFragmentFactory) {
                                    return file.localJsxFragmentNamespace = getFirstIdentifier(file.localJsxFragmentFactory).escapedText;
                                }
                            }
                            const entity = getJsxFragmentFactoryEntity(location);
                            if (entity) {
                                file.localJsxFragmentFactory = entity;
                                return file.localJsxFragmentNamespace = getFirstIdentifier(entity).escapedText;
                            }
                        }
                        else {
                            const localJsxNamespace = getLocalJsxNamespace(file);
                            if (localJsxNamespace) {
                                return file.localJsxNamespace = localJsxNamespace;
                            }
                        }
                    }
                }
                if (!_jsxNamespace) {
                    _jsxNamespace = "React";
                    if (compilerOptions.jsxFactory) {
                        _jsxFactoryEntity = parseIsolatedEntityName(compilerOptions.jsxFactory, languageVersion);
                        visitNode(_jsxFactoryEntity, markAsSynthetic);
                        if (_jsxFactoryEntity) {
                            _jsxNamespace = getFirstIdentifier(_jsxFactoryEntity).escapedText;
                        }
                    }
                    else if (compilerOptions.reactNamespace) {
                        _jsxNamespace = escapeLeadingUnderscores(compilerOptions.reactNamespace);
                    }
                }
                if (!_jsxFactoryEntity) {
                    _jsxFactoryEntity = factory.createQualifiedName(factory.createIdentifier(unescapeLeadingUnderscores(_jsxNamespace)), "createElement");
                }
                return _jsxNamespace;
            }