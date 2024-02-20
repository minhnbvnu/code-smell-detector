function emitJSDocComment(comment) {
                const text = getTextOfJSDocComment(comment);
                if (text) {
                    writeSpace();
                    write(text);
                }
            }