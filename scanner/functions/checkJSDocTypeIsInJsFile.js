function checkJSDocTypeIsInJsFile(node) {
                if (!isInJSFile(node)) {
                    if (isJSDocNonNullableType(node) || isJSDocNullableType(node)) {
                        const token = tokenToString(isJSDocNonNullableType(node) ? 53 /* ExclamationToken */ : 57 /* QuestionToken */);
                        const diagnostic = node.postfix ? Diagnostics._0_at_the_end_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1 : Diagnostics._0_at_the_start_of_a_type_is_not_valid_TypeScript_syntax_Did_you_mean_to_write_1;
                        const typeNode = node.type;
                        const type = getTypeFromTypeNode(typeNode);
                        grammarErrorOnNode(node, diagnostic, token, typeToString(isJSDocNullableType(node) && !(type === neverType || type === voidType) ? getUnionType(append([type, undefinedType], node.postfix ? void 0 : nullType)) : type));
                    }
                    else {
                        grammarErrorOnNode(node, Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments);
                    }
                }
            }