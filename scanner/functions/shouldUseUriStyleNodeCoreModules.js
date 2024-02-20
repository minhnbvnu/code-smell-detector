function shouldUseUriStyleNodeCoreModules(file, program) {
            const decisionFromFile = firstDefined(file.imports, (node) => {
                if (ts_JsTyping_exports.nodeCoreModules.has(node.text)) {
                    return startsWith(node.text, "node:");
                }
            });
            return decisionFromFile != null ? decisionFromFile : program.usesUriStyleNodeCoreModules;
        }