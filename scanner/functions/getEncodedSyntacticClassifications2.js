function getEncodedSyntacticClassifications2(fileName, span) {
                return getEncodedSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
            }