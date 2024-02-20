function replaceParameters(declarationOrSignature, parameterDeclarations) {
                changes.replaceNodeRangeWithNodes(sourceFile, first(declarationOrSignature.parameters), last(declarationOrSignature.parameters), parameterDeclarations, {
                    joiner: ", ",
                    // indentation is set to 0 because otherwise the object parameter will be indented if there is a `this` parameter
                    indentation: 0,
                    leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.IncludeAll,
                    trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Include
                });
            }