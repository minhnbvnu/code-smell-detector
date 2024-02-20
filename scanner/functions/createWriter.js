function createWriter(newLine) {
            let lastNonTriviaPosition = 0;
            const writer = createTextWriter(newLine);
            const onBeforeEmitNode = (node) => {
                if (node) {
                    setPos(node, lastNonTriviaPosition);
                }
            };
            const onAfterEmitNode = (node) => {
                if (node) {
                    setEnd(node, lastNonTriviaPosition);
                }
            };
            const onBeforeEmitNodeArray = (nodes) => {
                if (nodes) {
                    setPos(nodes, lastNonTriviaPosition);
                }
            };
            const onAfterEmitNodeArray = (nodes) => {
                if (nodes) {
                    setEnd(nodes, lastNonTriviaPosition);
                }
            };
            const onBeforeEmitToken = (node) => {
                if (node) {
                    setPos(node, lastNonTriviaPosition);
                }
            };
            const onAfterEmitToken = (node) => {
                if (node) {
                    setEnd(node, lastNonTriviaPosition);
                }
            };
            function setLastNonTriviaPosition(s, force) {
                if (force || !isTrivia2(s)) {
                    lastNonTriviaPosition = writer.getTextPos();
                    let i = 0;
                    while (isWhiteSpaceLike(s.charCodeAt(s.length - i - 1))) {
                        i++;
                    }
                    lastNonTriviaPosition -= i;
                }
            }
            function write(s) {
                writer.write(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeComment(s) {
                writer.writeComment(s);
            }
            function writeKeyword(s) {
                writer.writeKeyword(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeOperator(s) {
                writer.writeOperator(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writePunctuation(s) {
                writer.writePunctuation(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeTrailingSemicolon(s) {
                writer.writeTrailingSemicolon(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeParameter(s) {
                writer.writeParameter(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeProperty(s) {
                writer.writeProperty(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeSpace(s) {
                writer.writeSpace(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeStringLiteral(s) {
                writer.writeStringLiteral(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeSymbol(s, sym) {
                writer.writeSymbol(s, sym);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeLine(force) {
                writer.writeLine(force);
            }
            function increaseIndent() {
                writer.increaseIndent();
            }
            function decreaseIndent() {
                writer.decreaseIndent();
            }
            function getText() {
                return writer.getText();
            }
            function rawWrite(s) {
                writer.rawWrite(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }
            function writeLiteral(s) {
                writer.writeLiteral(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                true);
            }
            function getTextPos() {
                return writer.getTextPos();
            }
            function getLine() {
                return writer.getLine();
            }
            function getColumn() {
                return writer.getColumn();
            }
            function getIndent() {
                return writer.getIndent();
            }
            function isAtStartOfLine() {
                return writer.isAtStartOfLine();
            }
            function clear2() {
                writer.clear();
                lastNonTriviaPosition = 0;
            }
            return {
                onBeforeEmitNode,
                onAfterEmitNode,
                onBeforeEmitNodeArray,
                onAfterEmitNodeArray,
                onBeforeEmitToken,
                onAfterEmitToken,
                write,
                writeComment,
                writeKeyword,
                writeOperator,
                writePunctuation,
                writeTrailingSemicolon,
                writeParameter,
                writeProperty,
                writeSpace,
                writeStringLiteral,
                writeSymbol,
                writeLine,
                increaseIndent,
                decreaseIndent,
                getText,
                rawWrite,
                writeLiteral,
                getTextPos,
                getLine,
                getColumn,
                getIndent,
                isAtStartOfLine,
                hasTrailingComment: () => writer.hasTrailingComment(),
                hasTrailingWhitespace: () => writer.hasTrailingWhitespace(),
                clear: clear2
            };
        }