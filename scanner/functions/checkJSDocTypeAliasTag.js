function checkJSDocTypeAliasTag(node) {
                if (!node.typeExpression) {
                    error(node.name, Diagnostics.JSDoc_typedef_tag_should_either_have_a_type_annotation_or_be_followed_by_property_or_member_tags);
                }
                if (node.name) {
                    checkTypeNameIsReserved(node.name, Diagnostics.Type_alias_name_cannot_be_0);
                }
                checkSourceElement(node.typeExpression);
                checkTypeParameters(getEffectiveTypeParameterDeclarations(node));
            }