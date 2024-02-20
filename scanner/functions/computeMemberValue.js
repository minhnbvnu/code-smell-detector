function computeMemberValue(member, autoValue) {
                if (isComputedNonLiteralName(member.name)) {
                    error(member.name, Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                }
                else {
                    const text = getTextOfPropertyName(member.name);
                    if (isNumericLiteralName(text) && !isInfinityOrNaNString(text)) {
                        error(member.name, Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                    }
                }
                if (member.initializer) {
                    return computeConstantValue(member);
                }
                if (member.parent.flags & 16777216 /* Ambient */ && !isEnumConst(member.parent)) {
                    return void 0;
                }
                if (autoValue !== void 0) {
                    return autoValue;
                }
                error(member.name, Diagnostics.Enum_member_must_have_initializer);
                return void 0;
            }