function addRelatedInfo(diagnostic, ...relatedInformation) {
            if (!relatedInformation.length) {
                return diagnostic;
            }
            if (!diagnostic.relatedInformation) {
                diagnostic.relatedInformation = [];
            }
            Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
            diagnostic.relatedInformation.push(...relatedInformation);
            return diagnostic;
        }