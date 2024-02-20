function issueMemberSpecificError(node, typeWithThis, baseWithThis, broadDiag) {
                let issuedMemberError = false;
                for (const member of node.members) {
                    if (isStatic(member)) {
                        continue;
                    }
                    const declaredProp = member.name && getSymbolAtLocation(member.name) || getSymbolAtLocation(member);
                    if (declaredProp) {
                        const prop = getPropertyOfType(typeWithThis, declaredProp.escapedName);
                        const baseProp = getPropertyOfType(baseWithThis, declaredProp.escapedName);
                        if (prop && baseProp) {
                            const rootChain = () => chainDiagnosticMessages(
                            /*details*/
                            void 0, Diagnostics.Property_0_in_type_1_is_not_assignable_to_the_same_property_in_base_type_2, symbolToString(declaredProp), typeToString(typeWithThis), typeToString(baseWithThis));
                            if (!checkTypeAssignableTo(getTypeOfSymbol(prop), getTypeOfSymbol(baseProp), member.name || member, 
                            /*message*/
                            void 0, rootChain)) {
                                issuedMemberError = true;
                            }
                        }
                    }
                }
                if (!issuedMemberError) {
                    checkTypeAssignableTo(typeWithThis, baseWithThis, node.name || node, broadDiag);
                }
            }