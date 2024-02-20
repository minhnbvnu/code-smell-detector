function evaluateEnumMember(expr, symbol, location) {
                const declaration = symbol.valueDeclaration;
                if (!declaration || declaration === location) {
                    error(expr, Diagnostics.Property_0_is_used_before_being_assigned, symbolToString(symbol));
                    return void 0;
                }
                if (!isBlockScopedNameDeclaredBeforeUse(declaration, location)) {
                    error(expr, Diagnostics.A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums);
                    return 0;
                }
                return getEnumMemberValue(declaration);
            }