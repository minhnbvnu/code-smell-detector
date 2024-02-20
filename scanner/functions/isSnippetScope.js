function isSnippetScope(scopeNode) {
                switch (scopeNode.kind) {
                    case 308 /* SourceFile */:
                    case 225 /* TemplateExpression */:
                    case 291 /* JsxExpression */:
                    case 238 /* Block */:
                        return true;
                    default:
                        return isStatement(scopeNode);
                }
            }