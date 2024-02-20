function getEncodedSemanticClassifications3(fileName, span, format) {
                synchronizeHostData();
                const responseFormat = format || "original" /* Original */;
                if (responseFormat === "original" /* Original */) {
                    return getEncodedSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
                }
                else {
                    return ts_classifier_exports.v2020.getEncodedSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
                }
            }