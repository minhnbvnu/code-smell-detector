function getTrailingSemicolonDeferringWriter(writer) {
            let pendingTrailingSemicolon = false;
            function commitPendingTrailingSemicolon() {
                if (pendingTrailingSemicolon) {
                    writer.writeTrailingSemicolon(";");
                    pendingTrailingSemicolon = false;
                }
            }
            return {
                ...writer,
                writeTrailingSemicolon() {
                    pendingTrailingSemicolon = true;
                },
                writeLiteral(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeLiteral(s);
                },
                writeStringLiteral(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeStringLiteral(s);
                },
                writeSymbol(s, sym) {
                    commitPendingTrailingSemicolon();
                    writer.writeSymbol(s, sym);
                },
                writePunctuation(s) {
                    commitPendingTrailingSemicolon();
                    writer.writePunctuation(s);
                },
                writeKeyword(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeKeyword(s);
                },
                writeOperator(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeOperator(s);
                },
                writeParameter(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeParameter(s);
                },
                writeSpace(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeSpace(s);
                },
                writeProperty(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeProperty(s);
                },
                writeComment(s) {
                    commitPendingTrailingSemicolon();
                    writer.writeComment(s);
                },
                writeLine() {
                    commitPendingTrailingSemicolon();
                    writer.writeLine();
                },
                increaseIndent() {
                    commitPendingTrailingSemicolon();
                    writer.increaseIndent();
                },
                decreaseIndent() {
                    commitPendingTrailingSemicolon();
                    writer.decreaseIndent();
                }
            };
        }