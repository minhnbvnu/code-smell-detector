function checkTupleType(node) {
                const elementTypes = node.elements;
                let seenOptionalElement = false;
                let seenRestElement = false;
                const hasNamedElement = some(elementTypes, isNamedTupleMember);
                for (const e of elementTypes) {
                    if (e.kind !== 199 /* NamedTupleMember */ && hasNamedElement) {
                        grammarErrorOnNode(e, Diagnostics.Tuple_members_must_all_have_names_or_all_not_have_names);
                        break;
                    }
                    const flags = getTupleElementFlags(e);
                    if (flags & 8 /* Variadic */) {
                        const type = getTypeFromTypeNode(e.type);
                        if (!isArrayLikeType(type)) {
                            error(e, Diagnostics.A_rest_element_type_must_be_an_array_type);
                            break;
                        }
                        if (isArrayType(type) || isTupleType(type) && type.target.combinedFlags & 4 /* Rest */) {
                            seenRestElement = true;
                        }
                    }
                    else if (flags & 4 /* Rest */) {
                        if (seenRestElement) {
                            grammarErrorOnNode(e, Diagnostics.A_rest_element_cannot_follow_another_rest_element);
                            break;
                        }
                        seenRestElement = true;
                    }
                    else if (flags & 2 /* Optional */) {
                        if (seenRestElement) {
                            grammarErrorOnNode(e, Diagnostics.An_optional_element_cannot_follow_a_rest_element);
                            break;
                        }
                        seenOptionalElement = true;
                    }
                    else if (seenOptionalElement) {
                        grammarErrorOnNode(e, Diagnostics.A_required_element_cannot_follow_an_optional_element);
                        break;
                    }
                }
                forEach(node.elements, checkSourceElement);
                getTypeFromTypeNode(node);
            }