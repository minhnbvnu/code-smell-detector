function createUseStrictPrologue() {
                return startOnNewLine(createExpressionStatement(createStringLiteral("use strict")));
            }