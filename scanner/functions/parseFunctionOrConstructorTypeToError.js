function parseFunctionOrConstructorTypeToError(isInUnionType) {
                        if (isStartOfFunctionTypeOrConstructorType()) {
                            const type = parseFunctionOrConstructorType();
                            let diagnostic;
                            if (isFunctionTypeNode(type)) {
                                diagnostic = isInUnionType ? Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type : Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
                            }
                            else {
                                diagnostic = isInUnionType ? Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type : Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
                            }
                            parseErrorAtRange(type, diagnostic);
                            return type;
                        }
                        return void 0;
                    }