function visitEnumMember(member) {
                if (member.initializer) {
                    return;
                }
                const enumValue = checker.getConstantValue(member);
                if (enumValue !== void 0) {
                    addEnumMemberValueHints(enumValue.toString(), member.end);
                }
            }