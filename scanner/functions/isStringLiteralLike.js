function isStringLiteralLike(node) {
            return node.kind === 10 /* StringLiteral */ || node.kind === 14 /* NoSubstitutionTemplateLiteral */;
        }