function isStringLiteralOrTemplate(node) {
            switch (node.kind) {
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 225 /* TemplateExpression */:
                case 212 /* TaggedTemplateExpression */:
                    return true;
                default:
                    return false;
            }
        }