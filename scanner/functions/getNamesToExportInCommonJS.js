function getNamesToExportInCommonJS(decl) {
            switch (decl.kind) {
                case 259 /* FunctionDeclaration */:
                case 260 /* ClassDeclaration */:
                    return [decl.name.text];
                case 240 /* VariableStatement */:
                    return mapDefined(decl.declarationList.declarations, (d) => isIdentifier(d.name) ? d.name.text : void 0);
                case 264 /* ModuleDeclaration */:
                case 263 /* EnumDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                    return emptyArray;
                case 241 /* ExpressionStatement */:
                    return Debug.fail("Can't export an ExpressionStatement");
                default:
                    return Debug.assertNever(decl, `Unexpected decl kind ${decl.kind}`);
            }
        }