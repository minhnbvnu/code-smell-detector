function checkNamedTupleMember(node) {
                if (node.dotDotDotToken && node.questionToken) {
                    grammarErrorOnNode(node, Diagnostics.A_tuple_member_cannot_be_both_optional_and_rest);
                }
                if (node.type.kind === 187 /* OptionalType */) {
                    grammarErrorOnNode(node.type, Diagnostics.A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_colon_rather_than_after_the_type);
                }
                if (node.type.kind === 188 /* RestType */) {
                    grammarErrorOnNode(node.type, Diagnostics.A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type);
                }
                checkSourceElement(node.type);
                getTypeFromTypeNode(node);
            }