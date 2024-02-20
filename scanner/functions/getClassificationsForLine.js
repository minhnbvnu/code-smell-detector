function getClassificationsForLine(text, lexState, syntacticClassifierAbsent) {
                return convertClassificationsToResult(getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent), text);
            }