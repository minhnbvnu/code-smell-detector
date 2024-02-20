function namespaceElementVisitorWorker(node) {
                if (node.kind === 275 /* ExportDeclaration */ || node.kind === 269 /* ImportDeclaration */ || node.kind === 270 /* ImportClause */ || node.kind === 268 /* ImportEqualsDeclaration */ && node.moduleReference.kind === 280 /* ExternalModuleReference */) {
                    return void 0;
                }
                else if (node.transformFlags & 1 /* ContainsTypeScript */ || hasSyntacticModifier(node, 1 /* Export */)) {
                    return visitTypeScript(node);
                }
                return node;
            }