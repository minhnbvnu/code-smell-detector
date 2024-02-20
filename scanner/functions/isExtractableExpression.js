function isExtractableExpression(node) {
            const { parent: parent2 } = node;
            switch (parent2.kind) {
                case 302 /* EnumMember */:
                    return false;
            }
            switch (node.kind) {
                case 10 /* StringLiteral */:
                    return parent2.kind !== 269 /* ImportDeclaration */ && parent2.kind !== 273 /* ImportSpecifier */;
                case 227 /* SpreadElement */:
                case 203 /* ObjectBindingPattern */:
                case 205 /* BindingElement */:
                    return false;
                case 79 /* Identifier */:
                    return parent2.kind !== 205 /* BindingElement */ && parent2.kind !== 273 /* ImportSpecifier */ && parent2.kind !== 278 /* ExportSpecifier */;
            }
            return true;
        }