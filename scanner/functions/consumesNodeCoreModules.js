function consumesNodeCoreModules(sourceFile) {
            return some(sourceFile.imports, ({ text }) => ts_JsTyping_exports.nodeCoreModules.has(text));
        }