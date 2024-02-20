function getDefaultFormatCodeSettings(newLineCharacter) {
            return {
                indentSize: 4,
                tabSize: 4,
                newLineCharacter: newLineCharacter || "\n",
                convertTabsToSpaces: true,
                indentStyle: 2 /* Smart */,
                insertSpaceAfterConstructor: false,
                insertSpaceAfterCommaDelimiter: true,
                insertSpaceAfterSemicolonInForStatements: true,
                insertSpaceBeforeAndAfterBinaryOperators: true,
                insertSpaceAfterKeywordsInControlFlowStatements: true,
                insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
                insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
                insertSpaceBeforeFunctionParenthesis: false,
                placeOpenBraceOnNewLineForFunctions: false,
                placeOpenBraceOnNewLineForControlBlocks: false,
                semicolons: "ignore" /* Ignore */,
                trimTrailingWhitespace: true
            };
        }