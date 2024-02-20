function getExternalModuleName(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                case 275 /* ExportDeclaration */:
                    return node.moduleSpecifier;
                case 268 /* ImportEqualsDeclaration */:
                    return node.moduleReference.kind === 280 /* ExternalModuleReference */ ? node.moduleReference.expression : void 0;
                case 202 /* ImportType */:
                    return isLiteralImportTypeNode(node) ? node.argument.literal : void 0;
                case 210 /* CallExpression */:
                    return node.arguments[0];
                case 264 /* ModuleDeclaration */:
                    return node.name.kind === 10 /* StringLiteral */ ? node.name : void 0;
                default:
                    return Debug.assertNever(node);
            }
        }