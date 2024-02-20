function isPureImport(node) {
            switch (node.kind) {
                case 269 /* ImportDeclaration */:
                    return true;
                case 268 /* ImportEqualsDeclaration */:
                    return !hasSyntacticModifier(node, 1 /* Export */);
                case 240 /* VariableStatement */:
                    return node.declarationList.declarations.every((d) => !!d.initializer && isRequireCall(d.initializer, 
                    /*checkArgumentIsStringLiteralLike*/
                    true));
                default:
                    return false;
            }
        }