function isGlobalSourceFile(node) {
                return node.kind === 308 /* SourceFile */ && !isExternalOrCommonJsModule(node);
            }