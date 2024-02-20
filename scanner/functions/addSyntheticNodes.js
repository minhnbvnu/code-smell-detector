function addSyntheticNodes(nodes, pos, end, parent2) {
            scanner.setTextPos(pos);
            while (pos < end) {
                const token = scanner.scan();
                const textPos = scanner.getTextPos();
                if (textPos <= end) {
                    if (token === 79 /* Identifier */) {
                        if (hasTabstop(parent2)) {
                            continue;
                        }
                        Debug.fail(`Did not expect ${Debug.formatSyntaxKind(parent2.kind)} to have an Identifier in its trivia`);
                    }
                    nodes.push(createNode(token, pos, textPos, parent2));
                }
                pos = textPos;
                if (token === 1 /* EndOfFileToken */) {
                    break;
                }
            }
        }