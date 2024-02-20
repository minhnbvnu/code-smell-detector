function getItemName(node, name) {
            if (node.kind === 264 /* ModuleDeclaration */) {
                return cleanText(getModuleName(node));
            }
            if (name) {
                const text = isIdentifier(name) ? name.text : isElementAccessExpression(name) ? `[${nodeText(name.argumentExpression)}]` : nodeText(name);
                if (text.length > 0) {
                    return cleanText(text);
                }
            }
            switch (node.kind) {
                case 308 /* SourceFile */:
                    const sourceFile = node;
                    return isExternalModule(sourceFile) ? `"${escapeString(getBaseFileName(removeFileExtension(normalizePath(sourceFile.fileName))))}"` : "<global>";
                case 274 /* ExportAssignment */:
                    return isExportAssignment(node) && node.isExportEquals ? "export=" /* ExportEquals */ : "default" /* Default */;
                case 216 /* ArrowFunction */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                    if (getSyntacticModifierFlags(node) & 1024 /* Default */) {
                        return "default";
                    }
                    return getFunctionOrClassName(node);
                case 173 /* Constructor */:
                    return "constructor";
                case 177 /* ConstructSignature */:
                    return "new()";
                case 176 /* CallSignature */:
                    return "()";
                case 178 /* IndexSignature */:
                    return "[]";
                default:
                    return "<unknown>";
            }
        }