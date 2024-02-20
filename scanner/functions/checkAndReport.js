function checkAndReport(context, node, modules, declarationType, includeExports) {
        const module = getModule(node);
        if (modules.has(module)) {
            const previousNodes = modules.get(module);
            const messagesIds = [];
            const importNodes = getNodesByDeclarationType(previousNodes, "import");
            let exportNodes;
            if (includeExports) {
                exportNodes = getNodesByDeclarationType(previousNodes, "export");
            }
            if (declarationType === "import") {
                if (shouldReportImportExport(node, importNodes)) {
                    messagesIds.push("import");
                }
                if (includeExports) {
                    if (shouldReportImportExport(node, exportNodes)) {
                        messagesIds.push("importAs");
                    }
                }
            }
            else if (declarationType === "export") {
                if (shouldReportImportExport(node, exportNodes)) {
                    messagesIds.push("export");
                }
                if (shouldReportImportExport(node, importNodes)) {
                    messagesIds.push("exportAs");
                }
            }
            messagesIds.forEach(messageId => context.report({
                node,
                messageId,
                data: {
                    module
                }
            }));
        }
    }