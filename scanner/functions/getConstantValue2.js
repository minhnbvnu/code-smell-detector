function getConstantValue2(node) {
                if (node.kind === 302 /* EnumMember */) {
                    return getEnumMemberValue(node);
                }
                const symbol = getNodeLinks(node).resolvedSymbol;
                if (symbol && symbol.flags & 8 /* EnumMember */) {
                    const member = symbol.valueDeclaration;
                    if (isEnumConst(member.parent)) {
                        return getEnumMemberValue(member);
                    }
                }
                return void 0;
            }