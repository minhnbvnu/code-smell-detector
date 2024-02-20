function updateSourceFile2(sourceFile, newText, textChangeRange, aggressiveChecks) {
                        aggressiveChecks = aggressiveChecks || Debug.shouldAssert(2 /* Aggressive */);
                        checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
                        if (textChangeRangeIsUnchanged(textChangeRange)) {
                            return sourceFile;
                        }
                        if (sourceFile.statements.length === 0) {
                            return Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, 
                            /*syntaxCursor*/
                            void 0, 
                            /*setParentNodes*/
                            true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
                        }
                        const incrementalSourceFile = sourceFile;
                        Debug.assert(!incrementalSourceFile.hasBeenIncrementallyParsed);
                        incrementalSourceFile.hasBeenIncrementallyParsed = true;
                        Parser.fixupParentReferences(incrementalSourceFile);
                        const oldText = sourceFile.text;
                        const syntaxCursor = createSyntaxCursor(sourceFile);
                        const changeRange = extendToAffectedRange(sourceFile, textChangeRange);
                        checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);
                        Debug.assert(changeRange.span.start <= textChangeRange.span.start);
                        Debug.assert(textSpanEnd(changeRange.span) === textSpanEnd(textChangeRange.span));
                        Debug.assert(textSpanEnd(textChangeRangeNewSpan(changeRange)) === textSpanEnd(textChangeRangeNewSpan(textChangeRange)));
                        const delta = textChangeRangeNewSpan(changeRange).length - changeRange.span.length;
                        updateTokenPositionsAndMarkElements(incrementalSourceFile, changeRange.span.start, textSpanEnd(changeRange.span), textSpanEnd(textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);
                        const result = Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, 
                        /*setParentNodes*/
                        true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
                        result.commentDirectives = getNewCommentDirectives(sourceFile.commentDirectives, result.commentDirectives, changeRange.span.start, textSpanEnd(changeRange.span), delta, oldText, newText, aggressiveChecks);
                        result.impliedNodeFormat = sourceFile.impliedNodeFormat;
                        return result;
                    }