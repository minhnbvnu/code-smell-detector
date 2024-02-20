function getSyntacticClassifications2(fileName, span) {
                return getSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
            }