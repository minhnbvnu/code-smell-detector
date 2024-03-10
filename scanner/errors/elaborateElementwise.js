function elaborateElementwise(iterator, source, target, relation, containingMessageChain, errorOutputContainer) {
                let reportedError = false;
                for (const value of iterator) {
                    const { errorNode: prop, innerExpression: next, nameType, errorMessage } = value;
                    let targetPropType = getBestMatchIndexedAccessTypeOrUndefined(source, target, nameType);
                    if (!targetPropType || targetPropType.flags & 8388608 /* IndexedAccess */)
                        continue;
                    let sourcePropType = getIndexedAccessTypeOrUndefined(source, nameType);
                    if (!sourcePropType)
                        continue;
                    const propName = getPropertyNameFromIndex(nameType, 
                    /*accessNode*/
                    void 0);
                    if (!checkTypeRelatedTo(sourcePropType, targetPropType, relation, 
                    /*errorNode*/
                    void 0)) {
                        const elaborated = next && elaborateError(next, sourcePropType, targetPropType, relation, 
                        /*headMessage*/
                        void 0, containingMessageChain, errorOutputContainer);
                        reportedError = true;
                        if (!elaborated) {
                            const resultObj = errorOutputContainer || {};
                            const specificSource = next ? checkExpressionForMutableLocationWithContextualType(next, sourcePropType) : sourcePropType;
                            if (exactOptionalPropertyTypes && isExactOptionalPropertyMismatch(specificSource, targetPropType)) {
                                const diag2 = createDiagnosticForNode(prop, Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target, typeToString(specificSource), typeToString(targetPropType));
                                diagnostics.add(diag2);
                                resultObj.errors = [diag2];
                            }
                            else {
                                const targetIsOptional = !!(propName && (getPropertyOfType(target, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                const sourceIsOptional = !!(propName && (getPropertyOfType(source, propName) || unknownSymbol).flags & 16777216 /* Optional */);
                                targetPropType = removeMissingType(targetPropType, targetIsOptional);
                                sourcePropType = removeMissingType(sourcePropType, targetIsOptional && sourceIsOptional);
                                const result = checkTypeRelatedTo(specificSource, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                if (result && specificSource !== sourcePropType) {
                                    checkTypeRelatedTo(sourcePropType, targetPropType, relation, prop, errorMessage, containingMessageChain, resultObj);
                                }
                            }
                            if (resultObj.errors) {
                                const reportedDiag = resultObj.errors[resultObj.errors.length - 1];
                                const propertyName = isTypeUsableAsPropertyName(nameType) ? getPropertyNameFromType(nameType) : void 0;
                                const targetProp = propertyName !== void 0 ? getPropertyOfType(target, propertyName) : void 0;
                                let issuedElaboration = false;
                                if (!targetProp) {
                                    const indexInfo = getApplicableIndexInfo(target, nameType);
                                    if (indexInfo && indexInfo.declaration && !getSourceFileOfNode(indexInfo.declaration).hasNoDefaultLib) {
                                        issuedElaboration = true;
                                        addRelatedInfo(reportedDiag, createDiagnosticForNode(indexInfo.declaration, Diagnostics.The_expected_type_comes_from_this_index_signature));
                                    }
                                }
                                if (!issuedElaboration && (targetProp && length(targetProp.declarations) || target.symbol && length(target.symbol.declarations))) {
                                    const targetNode = targetProp && length(targetProp.declarations) ? targetProp.declarations[0] : target.symbol.declarations[0];
                                    if (!getSourceFileOfNode(targetNode).hasNoDefaultLib) {
                                        addRelatedInfo(reportedDiag, createDiagnosticForNode(targetNode, Diagnostics.The_expected_type_comes_from_property_0_which_is_declared_here_on_type_1, propertyName && !(nameType.flags & 8192 /* UniqueESSymbol */) ? unescapeLeadingUnderscores(propertyName) : typeToString(nameType), typeToString(target)));
                                    }
                                }
                            }
                        }
                    }
                }
                return reportedError;
            }