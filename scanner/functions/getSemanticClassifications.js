function getSemanticClassifications(typeChecker, cancellationToken, sourceFile, classifiableNames, span) {
            return convertClassificationsToSpans(getEncodedSemanticClassifications(typeChecker, cancellationToken, sourceFile, classifiableNames, span));
        }