function checkGrammarNumericLiteral(node) {
                if (node.numericLiteralFlags & 32 /* Octal */) {
                    let diagnosticMessage;
                    if (languageVersion >= 1 /* ES5 */) {
                        diagnosticMessage = Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher_Use_the_syntax_0;
                    }
                    else if (isChildOfNodeWithKind(node, 198 /* LiteralType */)) {
                        diagnosticMessage = Diagnostics.Octal_literal_types_must_use_ES2015_syntax_Use_the_syntax_0;
                    }
                    else if (isChildOfNodeWithKind(node, 302 /* EnumMember */)) {
                        diagnosticMessage = Diagnostics.Octal_literals_are_not_allowed_in_enums_members_initializer_Use_the_syntax_0;
                    }
                    if (diagnosticMessage) {
                        const withMinus = isPrefixUnaryExpression(node.parent) && node.parent.operator === 40 /* MinusToken */;
                        const literal = (withMinus ? "-" : "") + "0o" + node.text;
                        return grammarErrorOnNode(withMinus ? node.parent : node, diagnosticMessage, literal);
                    }
                }
                checkNumericLiteralValueSize(node);
                return false;
            }