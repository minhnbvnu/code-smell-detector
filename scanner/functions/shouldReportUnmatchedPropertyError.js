function shouldReportUnmatchedPropertyError(source2, target2) {
                    const typeCallSignatures = getSignaturesOfStructuredType(source2, 0 /* Call */);
                    const typeConstructSignatures = getSignaturesOfStructuredType(source2, 1 /* Construct */);
                    const typeProperties = getPropertiesOfObjectType(source2);
                    if ((typeCallSignatures.length || typeConstructSignatures.length) && !typeProperties.length) {
                        if (getSignaturesOfType(target2, 0 /* Call */).length && typeCallSignatures.length || getSignaturesOfType(target2, 1 /* Construct */).length && typeConstructSignatures.length) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }