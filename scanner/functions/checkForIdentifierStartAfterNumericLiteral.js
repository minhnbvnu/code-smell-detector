function checkForIdentifierStartAfterNumericLiteral(numericStart, isScientific) {
                if (!isIdentifierStart(codePointAt(text, pos), languageVersion)) {
                    return;
                }
                const identifierStart = pos;
                const { length: length3 } = scanIdentifierParts();
                if (length3 === 1 && text[identifierStart] === "n") {
                    if (isScientific) {
                        error(Diagnostics.A_bigint_literal_cannot_use_exponential_notation, numericStart, identifierStart - numericStart + 1);
                    }
                    else {
                        error(Diagnostics.A_bigint_literal_must_be_an_integer, numericStart, identifierStart - numericStart + 1);
                    }
                }
                else {
                    error(Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, identifierStart, length3);
                    pos = identifierStart;
                }
            }