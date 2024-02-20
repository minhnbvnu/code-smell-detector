function computeConstantValue(member) {
                const isConstEnum = isEnumConst(member.parent);
                const initializer = member.initializer;
                const value = evaluate(initializer, member);
                if (value !== void 0) {
                    if (isConstEnum && typeof value === "number" && !isFinite(value)) {
                        error(initializer, isNaN(value) ? Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN : Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
                    }
                }
                else if (isConstEnum) {
                    error(initializer, Diagnostics.const_enum_member_initializers_must_be_constant_expressions);
                }
                else if (member.parent.flags & 16777216 /* Ambient */) {
                    error(initializer, Diagnostics.In_ambient_enum_declarations_member_initializer_must_be_constant_expression);
                }
                else {
                    checkTypeAssignableTo(checkExpression(initializer), numberType, initializer, Diagnostics.Type_0_is_not_assignable_to_type_1_as_required_for_computed_enum_member_values);
                }
                return value;
            }