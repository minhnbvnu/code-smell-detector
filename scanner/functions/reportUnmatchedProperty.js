function reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties) {
                    let shouldSkipElaboration = false;
                    if (unmatchedProperty.valueDeclaration && isNamedDeclaration(unmatchedProperty.valueDeclaration) && isPrivateIdentifier(unmatchedProperty.valueDeclaration.name) && source2.symbol && source2.symbol.flags & 32 /* Class */) {
                        const privateIdentifierDescription = unmatchedProperty.valueDeclaration.name.escapedText;
                        const symbolTableKey = getSymbolNameForPrivateIdentifier(source2.symbol, privateIdentifierDescription);
                        if (symbolTableKey && getPropertyOfType(source2, symbolTableKey)) {
                            const sourceName = factory.getDeclarationName(source2.symbol.valueDeclaration);
                            const targetName = factory.getDeclarationName(target2.symbol.valueDeclaration);
                            reportError(Diagnostics.Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2, diagnosticName(privateIdentifierDescription), diagnosticName(sourceName.escapedText === "" ? anon : sourceName), diagnosticName(targetName.escapedText === "" ? anon : targetName));
                            return;
                        }
                    }
                    const props = arrayFrom(getUnmatchedProperties(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false));
                    if (!headMessage || headMessage.code !== Diagnostics.Class_0_incorrectly_implements_interface_1.code && headMessage.code !== Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code) {
                        shouldSkipElaboration = true;
                    }
                    if (props.length === 1) {
                        const propName = symbolToString(unmatchedProperty, 
                        /*enclosingDeclaration*/
                        void 0, 0 /* None */, 4 /* AllowAnyNodeKind */ | 16 /* WriteComputedProps */);
                        reportError(Diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2, propName, ...getTypeNamesForErrorDisplay(source2, target2));
                        if (length(unmatchedProperty.declarations)) {
                            associateRelatedInfo(createDiagnosticForNode(unmatchedProperty.declarations[0], Diagnostics._0_is_declared_here, propName));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                    else if (tryElaborateArrayLikeErrors(source2, target2, 
                    /*reportErrors*/
                    false)) {
                        if (props.length > 5) {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more, typeToString(source2), typeToString(target2), map(props.slice(0, 4), (p) => symbolToString(p)).join(", "), props.length - 4);
                        }
                        else {
                            reportError(Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2, typeToString(source2), typeToString(target2), map(props, (p) => symbolToString(p)).join(", "));
                        }
                        if (shouldSkipElaboration && errorInfo) {
                            overrideNextErrorInfo++;
                        }
                    }
                }