function checkRestrictedPathAndReport(importSource, importNames, node) {
                if (!Object.prototype.hasOwnProperty.call(restrictedPathMessages, importSource)) {
                    return;
                }
                const customMessage = restrictedPathMessages[importSource].message;
                const restrictedImportNames = restrictedPathMessages[importSource].importNames;
                if (restrictedImportNames) {
                    if (importNames.has("*")) {
                        const specifierData = importNames.get("*")[0];
                        context.report({
                            node,
                            messageId: customMessage ? "everythingWithCustomMessage" : "everything",
                            loc: specifierData.loc,
                            data: {
                                importSource,
                                importNames: restrictedImportNames,
                                customMessage
                            }
                        });
                    }
                    restrictedImportNames.forEach(importName => {
                        if (importNames.has(importName)) {
                            const specifiers = importNames.get(importName);
                            specifiers.forEach(specifier => {
                                context.report({
                                    node,
                                    messageId: customMessage ? "importNameWithCustomMessage" : "importName",
                                    loc: specifier.loc,
                                    data: {
                                        importSource,
                                        customMessage,
                                        importName
                                    }
                                });
                            });
                        }
                    });
                }
                else {
                    context.report({
                        node,
                        messageId: customMessage ? "pathWithCustomMessage" : "path",
                        data: {
                            importSource,
                            customMessage
                        }
                    });
                }
            }