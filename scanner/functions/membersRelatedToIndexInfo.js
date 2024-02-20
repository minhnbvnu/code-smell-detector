function membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    let result2 = -1 /* True */;
                    const keyType = targetInfo.keyType;
                    const props = source2.flags & 2097152 /* Intersection */ ? getPropertiesOfUnionOrIntersectionType(source2) : getPropertiesOfObjectType(source2);
                    for (const prop of props) {
                        if (isIgnoredJsxProperty(source2, prop)) {
                            continue;
                        }
                        if (isApplicableIndexType(getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */), keyType)) {
                            const propType = getNonMissingTypeOfSymbol(prop);
                            const type = exactOptionalPropertyTypes || propType.flags & 32768 /* Undefined */ || keyType === numberType || !(prop.flags & 16777216 /* Optional */) ? propType : getTypeWithFacts(propType, 524288 /* NEUndefined */);
                            const related = isRelatedTo(type, targetInfo.type, 3 /* Both */, reportErrors2, 
                            /*headMessage*/
                            void 0, intersectionState);
                            if (!related) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Property_0_is_incompatible_with_index_signature, symbolToString(prop));
                                }
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    for (const info of getIndexInfosOfType(source2)) {
                        if (isApplicableIndexType(info.keyType, keyType)) {
                            const related = indexInfoRelatedTo(info, targetInfo, reportErrors2, intersectionState);
                            if (!related) {
                                return 0 /* False */;
                            }
                            result2 &= related;
                        }
                    }
                    return result2;
                }