function checkEnumMember(node) {
                if (isPrivateIdentifier(node.name)) {
                    error(node, Diagnostics.An_enum_member_cannot_be_named_with_a_private_identifier);
                }
                if (node.initializer) {
                    checkExpression(node.initializer);
                }
            }