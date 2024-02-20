function writeLineOrSpace(parentNode, prevChildNode, nextChildNode) {
                if (getEmitFlags(parentNode) & 1 /* SingleLine */) {
                    writeSpace();
                }
                else if (preserveSourceNewlines) {
                    const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
                    if (lines) {
                        writeLine(lines);
                    }
                    else {
                        writeSpace();
                    }
                }
                else {
                    writeLine();
                }
            }