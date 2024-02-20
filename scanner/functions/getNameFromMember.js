function getNameFromMember(member, sourceCode) {
        if (member.key.type === utils_1.AST_NODE_TYPES.Identifier) {
            return {
                type: MemberNameType.Normal,
                name: member.key.name,
            };
        }
        if (member.key.type === utils_1.AST_NODE_TYPES.PrivateIdentifier) {
            return {
                type: MemberNameType.Private,
                name: `#${member.key.name}`,
            };
        }
        if (member.key.type === utils_1.AST_NODE_TYPES.Literal) {
            const name = `${member.key.value}`;
            if ((0, type_utils_1.requiresQuoting)(name)) {
                return {
                    type: MemberNameType.Quoted,
                    name: `"${name}"`,
                };
            }
            else {
                return {
                    type: MemberNameType.Normal,
                    name,
                };
            }
        }
        return {
            type: MemberNameType.Expression,
            name: sourceCode.text.slice(...member.key.range),
        };
    }