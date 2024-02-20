function checkExportedName(node) {
                const name = astUtils.getModuleExportName(node);
                if (restrictedNames.has(name)) {
                    context.report({
                        node,
                        messageId: "restrictedNamed",
                        data: { name }
                    });
                    return;
                }
                if (name === "default") {
                    if (node.parent.type === "ExportAllDeclaration") {
                        if (restrictDefaultExports && restrictDefaultExports.namespaceFrom) {
                            context.report({
                                node,
                                messageId: "restrictedDefault"
                            });
                        }
                    }
                    else { // ExportSpecifier
                        const isSourceSpecified = !!node.parent.parent.source;
                        const specifierLocalName = astUtils.getModuleExportName(node.parent.local);
                        if (!isSourceSpecified && restrictDefaultExports && restrictDefaultExports.named) {
                            context.report({
                                node,
                                messageId: "restrictedDefault"
                            });
                            return;
                        }
                        if (isSourceSpecified && restrictDefaultExports) {
                            if ((specifierLocalName === "default" && restrictDefaultExports.defaultFrom) ||
                                (specifierLocalName !== "default" && restrictDefaultExports.namedFrom)) {
                                context.report({
                                    node,
                                    messageId: "restrictedDefault"
                                });
                            }
                        }
                    }
                }
            }