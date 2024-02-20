function isIgnoredPropertyAssignment(identifierName) {
                return ignoredPropertyAssignmentsFor.includes(identifierName) ||
                    ignoredPropertyAssignmentsForRegex.some(ignored => new RegExp(ignored, "u").test(identifierName));
            }