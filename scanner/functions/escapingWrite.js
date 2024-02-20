function escapingWrite(s, write) {
                const escaped = escapeSnippetText(s);
                if (escaped !== s) {
                    const start = baseWriter.getTextPos();
                    write();
                    const end = baseWriter.getTextPos();
                    escapes = append(escapes || (escapes = []), { newText: escaped, span: { start, length: end - start } });
                }
                else {
                    write();
                }
            }