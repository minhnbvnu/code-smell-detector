function emitEmptyStatement(isEmbeddedStatement) {
                if (isEmbeddedStatement) {
                    writePunctuation(";");
                }
                else {
                    writeTrailingSemicolon();
                }
            }