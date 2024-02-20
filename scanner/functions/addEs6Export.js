function addEs6Export(d) {
            const modifiers = canHaveModifiers(d) ? concatenate([factory.createModifier(93 /* ExportKeyword */)], getModifiers(d)) : void 0;
            switch (d.kind) {
                case 259 /* FunctionDeclaration */:
                    return factory.updateFunctionDeclaration(d, modifiers, d.asteriskToken, d.name, d.typeParameters, d.parameters, d.type, d.body);
                case 260 /* ClassDeclaration */:
                    const decorators = canHaveDecorators(d) ? getDecorators(d) : void 0;
                    return factory.updateClassDeclaration(d, concatenate(decorators, modifiers), d.name, d.typeParameters, d.heritageClauses, d.members);
                case 240 /* VariableStatement */:
                    return factory.updateVariableStatement(d, modifiers, d.declarationList);
                case 264 /* ModuleDeclaration */:
                    return factory.updateModuleDeclaration(d, modifiers, d.name, d.body);
                case 263 /* EnumDeclaration */:
                    return factory.updateEnumDeclaration(d, modifiers, d.name, d.members);
                case 262 /* TypeAliasDeclaration */:
                    return factory.updateTypeAliasDeclaration(d, modifiers, d.name, d.typeParameters, d.type);
                case 261 /* InterfaceDeclaration */:
                    return factory.updateInterfaceDeclaration(d, modifiers, d.name, d.typeParameters, d.heritageClauses, d.members);
                case 268 /* ImportEqualsDeclaration */:
                    return factory.updateImportEqualsDeclaration(d, modifiers, d.isTypeOnly, d.name, d.moduleReference);
                case 241 /* ExpressionStatement */:
                    return Debug.fail();
                default:
                    return Debug.assertNever(d, `Unexpected declaration kind ${d.kind}`);
            }
        }