function getNonformattedText(node, sourceFile, newLineCharacter) {
                        const writer = createWriter(newLineCharacter);
                        const newLine = getNewLineKind(newLineCharacter);
                        createPrinter({
                            newLine,
                            neverAsciiEscape: true,
                            preserveSourceNewlines: true,
                            terminateUnterminatedLiterals: true
                        }, writer).writeNode(4 /* Unspecified */, node, sourceFile, writer);
                        return { text: writer.getText(), node: assignPositionsToNode(node) };
                    }