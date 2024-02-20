function checkPrivateIdentifier(node) {
                if (node.escapedText === "#constructor") {
                    if (!file.parseDiagnostics.length) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.constructor_is_a_reserved_word, declarationNameToString(node)));
                    }
                }
            }