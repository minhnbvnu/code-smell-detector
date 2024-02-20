function getSyntacticClassifications(cancellationToken, sourceFile, span) {
            return convertClassificationsToSpans(getEncodedSyntacticClassifications(cancellationToken, sourceFile, span));
        }