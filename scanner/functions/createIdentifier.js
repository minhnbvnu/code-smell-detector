function createIdentifier(isIdentifier3, diagnosticMessage, privateIdentifierDiagnosticMessage) {
                        if (isIdentifier3) {
                            identifierCount++;
                            const pos = getNodePos();
                            const originalKeywordKind = token();
                            const text = internIdentifier(scanner2.getTokenValue());
                            const hasExtendedUnicodeEscape = scanner2.hasExtendedUnicodeEscape();
                            nextTokenWithoutCheck();
                            return finishNode(factoryCreateIdentifier(text, originalKeywordKind, hasExtendedUnicodeEscape), pos);
                        }
                        if (token() === 80 /* PrivateIdentifier */) {
                            parseErrorAtCurrentToken(privateIdentifierDiagnosticMessage || Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
                            return createIdentifier(
                            /*isIdentifier*/
                            true);
                        }
                        if (token() === 0 /* Unknown */ && scanner2.tryScan(() => scanner2.reScanInvalidIdentifier() === 79 /* Identifier */)) {
                            return createIdentifier(
                            /*isIdentifier*/
                            true);
                        }
                        identifierCount++;
                        const reportAtCurrentPosition = token() === 1 /* EndOfFileToken */;
                        const isReservedWord = scanner2.isReservedWord();
                        const msgArg = scanner2.getTokenText();
                        const defaultMessage = isReservedWord ? Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here : Diagnostics.Identifier_expected;
                        return createMissingNode(79 /* Identifier */, reportAtCurrentPosition, diagnosticMessage || defaultMessage, msgArg);
                    }