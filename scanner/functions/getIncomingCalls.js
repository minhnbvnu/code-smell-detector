function getIncomingCalls(program, declaration, cancellationToken) {
            if (isSourceFile(declaration) || isModuleDeclaration(declaration) || isClassStaticBlockDeclaration(declaration)) {
                return [];
            }
            const location = getCallHierarchyDeclarationReferenceNode(declaration);
            const calls = filter(ts_FindAllReferences_exports.findReferenceOrRenameEntries(program, cancellationToken, program.getSourceFiles(), location, 
            /*position*/
            0, { use: ts_FindAllReferences_exports.FindReferencesUse.References }, convertEntryToCallSite), isDefined);
            return calls ? group(calls, getCallSiteGroupKey, (entries) => convertCallSiteGroupToIncomingCall(program, entries)) : [];
        }