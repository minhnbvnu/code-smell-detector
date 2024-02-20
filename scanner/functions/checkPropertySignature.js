function checkPropertySignature(node) {
                if (isPrivateIdentifier(node.name)) {
                    error(node, Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                }
                return checkPropertyDeclaration(node);
            }