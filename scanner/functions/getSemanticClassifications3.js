function getSemanticClassifications3(fileName, span, format) {
                synchronizeHostData();
                const responseFormat = format || "original" /* Original */;
                if (responseFormat === "2020" /* TwentyTwenty */) {
                    return ts_classifier_exports.v2020.getSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
                }
                else {
                    return getSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
                }
            }