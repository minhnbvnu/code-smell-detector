function checkContextualIdentifier(node) {
                if (!file.parseDiagnostics.length && !(node.flags & 16777216 /* Ambient */) && !(node.flags & 8388608 /* JSDoc */) && !isIdentifierName(node)) {
                    const originalKeywordKind = identifierToKeywordKind(node);
                    if (originalKeywordKind === void 0) {
                        return;
                    }
                    if (inStrictMode && originalKeywordKind >= 117 /* FirstFutureReservedWord */ && originalKeywordKind <= 125 /* LastFutureReservedWord */) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, getStrictModeIdentifierMessage(node), declarationNameToString(node)));
                    }
                    else if (originalKeywordKind === 133 /* AwaitKeyword */) {
                        if (isExternalModule(file) && isInTopLevelContext(node)) {
                            file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, declarationNameToString(node)));
                        }
                        else if (node.flags & 32768 /* AwaitContext */) {
                            file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
                        }
                    }
                    else if (originalKeywordKind === 125 /* YieldKeyword */ && node.flags & 8192 /* YieldContext */) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
                    }
                }
            }