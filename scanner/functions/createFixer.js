function createFixer(member) {
                if (member.property.type === utils_1.AST_NODE_TYPES.Literal &&
                    typeof member.property.value === 'string') {
                    return createPropertyReplacement(member.property, `.${member.property.value}`);
                }
                return undefined;
            }