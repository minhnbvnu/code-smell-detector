function reportPathForPatterns(node, group, importNames) {
                const importSource = node.source.value.trim();
                const customMessage = group.customMessage;
                const restrictedImportNames = group.importNames;
                /*
                 * If we are not restricting to any specific import names and just the pattern itself,
                 * report the error and move on
                 */
                if (!restrictedImportNames) {
                    context.report({
                        node,
                        messageId: customMessage ? "patternWithCustomMessage" : "patterns",
                        data: {
                            importSource,
                            customMessage
                        }
                    });
                    return;
                }
                if (importNames.has("*")) {
                    const specifierData = importNames.get("*")[0];
                    context.report({
                        node,
                        messageId: customMessage ? "patternAndEverythingWithCustomMessage" : "patternAndEverything",
                        loc: specifierData.loc,
                        data: {
                            importSource,
                            importNames: restrictedImportNames,
                            customMessage
                        }
                    });
                }
                restrictedImportNames.forEach(importName => {
                    if (!importNames.has(importName)) {
                        return;
                    }
                    const specifiers = importNames.get(importName);
                    specifiers.forEach(specifier => {
                        context.report({
                            node,
                            messageId: customMessage ? "patternAndImportNameWithCustomMessage" : "patternAndImportName",
                            loc: specifier.loc,
                            data: {
                                importSource,
                                customMessage,
                                importName
                            }
                        });
                    });
                });
            }