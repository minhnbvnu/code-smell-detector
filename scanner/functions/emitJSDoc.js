function emitJSDoc(node) {
                write("/**");
                if (node.comment) {
                    const text = getTextOfJSDocComment(node.comment);
                    if (text) {
                        const lines = text.split(/\r\n?|\n/g);
                        for (const line of lines) {
                            writeLine();
                            writeSpace();
                            writePunctuation("*");
                            writeSpace();
                            write(line);
                        }
                    }
                }
                if (node.tags) {
                    if (node.tags.length === 1 && node.tags[0].kind === 347 /* JSDocTypeTag */ && !node.comment) {
                        writeSpace();
                        emit(node.tags[0]);
                    }
                    else {
                        emitList(node, node.tags, 33 /* JSDocComment */);
                    }
                }
                writeSpace();
                write("*/");
            }