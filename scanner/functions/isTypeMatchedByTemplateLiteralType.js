function isTypeMatchedByTemplateLiteralType(source, target) {
                const inferences = inferTypesFromTemplateLiteralType(source, target);
                return !!inferences && every(inferences, (r, i) => isValidTypeForTemplateLiteralPlaceholder(r, target.types[i]));
            }