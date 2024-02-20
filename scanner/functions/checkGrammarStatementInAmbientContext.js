function checkGrammarStatementInAmbientContext(node) {
                if (node.flags & 16777216 /* Ambient */) {
                    const links = getNodeLinks(node);
                    if (!links.hasReportedStatementInAmbientContext && (isFunctionLike(node.parent) || isAccessor(node.parent))) {
                        return getNodeLinks(node).hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                    }
                    if (node.parent.kind === 238 /* Block */ || node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                        const links2 = getNodeLinks(node.parent);
                        if (!links2.hasReportedStatementInAmbientContext) {
                            return links2.hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
                        }
                    }
                    else {
                    }
                }
                return false;
            }