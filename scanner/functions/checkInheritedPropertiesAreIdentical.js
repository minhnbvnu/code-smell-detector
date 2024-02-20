function checkInheritedPropertiesAreIdentical(type, typeNode) {
                const baseTypes = getBaseTypes(type);
                if (baseTypes.length < 2) {
                    return true;
                }
                const seen = /* @__PURE__ */ new Map();
                forEach(resolveDeclaredMembers(type).declaredProperties, (p) => {
                    seen.set(p.escapedName, { prop: p, containingType: type });
                });
                let ok = true;
                for (const base of baseTypes) {
                    const properties = getPropertiesOfType(getTypeWithThisArgument(base, type.thisType));
                    for (const prop of properties) {
                        const existing = seen.get(prop.escapedName);
                        if (!existing) {
                            seen.set(prop.escapedName, { prop, containingType: base });
                        }
                        else {
                            const isInheritedProperty = existing.containingType !== type;
                            if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                                ok = false;
                                const typeName1 = typeToString(existing.containingType);
                                const typeName2 = typeToString(base);
                                let errorInfo = chainDiagnosticMessages(
                                /*details*/
                                void 0, Diagnostics.Named_property_0_of_types_1_and_2_are_not_identical, symbolToString(prop), typeName1, typeName2);
                                errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                                diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(typeNode), typeNode, errorInfo));
                            }
                        }
                    }
                }
                return ok;
            }