function checkGrammarArrowFunction(node, file) {
                if (!isArrowFunction(node)) {
                    return false;
                }
                if (node.typeParameters && !(length(node.typeParameters) > 1 || node.typeParameters.hasTrailingComma || node.typeParameters[0].constraint)) {
                    if (file && fileExtensionIsOneOf(file.fileName, [".mts" /* Mts */, ".cts" /* Cts */])) {
                        grammarErrorOnNode(node.typeParameters[0], Diagnostics.This_syntax_is_reserved_in_files_with_the_mts_or_cts_extension_Add_a_trailing_comma_or_explicit_constraint);
                    }
                }
                const { equalsGreaterThanToken } = node;
                const startLine = getLineAndCharacterOfPosition(file, equalsGreaterThanToken.pos).line;
                const endLine = getLineAndCharacterOfPosition(file, equalsGreaterThanToken.end).line;
                return startLine !== endLine && grammarErrorOnNode(equalsGreaterThanToken, Diagnostics.Line_terminator_not_permitted_before_arrow);
            }