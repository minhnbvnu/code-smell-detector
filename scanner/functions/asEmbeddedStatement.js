function asEmbeddedStatement(statement) {
                return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginalNode(createEmptyStatement(), statement), statement) : statement;
            }