function collectObjectLiteralMethodSymbols(members, enclosingDeclaration) {
                if (isInJSFile(location)) {
                    return;
                }
                members.forEach((member) => {
                    if (!isObjectLiteralMethodSymbol(member)) {
                        return;
                    }
                    const displayName = getCompletionEntryDisplayNameForSymbol(member, getEmitScriptTarget(compilerOptions), 
                    /*origin*/
                    void 0, 0 /* ObjectPropertyDeclaration */, 
                    /*jsxIdentifierExpected*/
                    false);
                    if (!displayName) {
                        return;
                    }
                    const { name } = displayName;
                    const entryProps = getEntryForObjectLiteralMethodCompletion(member, name, enclosingDeclaration, program, host, compilerOptions, preferences, formatContext);
                    if (!entryProps) {
                        return;
                    }
                    const origin = { kind: 128 /* ObjectLiteralMethod */, ...entryProps };
                    flags |= 32 /* MayIncludeMethodSnippets */;
                    symbolToOriginInfoMap[symbols.length] = origin;
                    symbols.push(member);
                });
            }