function shouldReport(effectiveParent, name) {
                return (!onlyDeclarations || DECLARATION_TYPES.has(effectiveParent.type)) &&
                    !ALLOWED_PARENT_TYPES.has(effectiveParent.type) && isInvalid(name);
            }