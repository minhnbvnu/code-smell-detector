function is_exports(node) {
                return typescript_1.default.isIdentifier(node) && node.text == "exports";
            }