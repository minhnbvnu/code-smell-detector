function doChange36(sourceFile, program, host, changes, functionDeclaration, groupedReferences) {
            const signature = groupedReferences.signature;
            const newFunctionDeclarationParams = map(createNewParameters(functionDeclaration, program, host), (param) => getSynthesizedDeepClone(param));
            if (signature) {
                const newSignatureParams = map(createNewParameters(signature, program, host), (param) => getSynthesizedDeepClone(param));
                replaceParameters(signature, newSignatureParams);
            }
            replaceParameters(functionDeclaration, newFunctionDeclarationParams);
            const functionCalls = sortAndDeduplicate(groupedReferences.functionCalls, 
            /*comparer*/
            (a, b) => compareValues(a.pos, b.pos));
            for (const call of functionCalls) {
                if (call.arguments && call.arguments.length) {
                    const newArgument = getSynthesizedDeepClone(createNewArgument(functionDeclaration, call.arguments), 
                    /*includeTrivia*/
                    true);
                    changes.replaceNodeRange(getSourceFileOfNode(call), first(call.arguments), last(call.arguments), newArgument, { leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.IncludeAll, trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include });
                }
            }
            function replaceParameters(declarationOrSignature, parameterDeclarations) {
                changes.replaceNodeRangeWithNodes(sourceFile, first(declarationOrSignature.parameters), last(declarationOrSignature.parameters), parameterDeclarations, {
                    joiner: ", ",
                    // indentation is set to 0 because otherwise the object parameter will be indented if there is a `this` parameter
                    indentation: 0,
                    leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.IncludeAll,
                    trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include
                });
            }
        }