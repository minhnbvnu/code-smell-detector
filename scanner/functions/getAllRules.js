function getAllRules() {
            const allTokens = [];
            for (let token = 0 /* FirstToken */; token <= 162 /* LastToken */; token++) {
                if (token !== 1 /* EndOfFileToken */) {
                    allTokens.push(token);
                }
            }
            function anyTokenExcept(...tokens) {
                return { tokens: allTokens.filter((t) => !tokens.some((t2) => t2 === t)), isSpecific: false };
            }
            const anyToken = { tokens: allTokens, isSpecific: false };
            const anyTokenIncludingMultilineComments = tokenRangeFrom([...allTokens, 3 /* MultiLineCommentTrivia */]);
            const anyTokenIncludingEOF = tokenRangeFrom([...allTokens, 1 /* EndOfFileToken */]);
            const keywords = tokenRangeFromRange(81 /* FirstKeyword */, 162 /* LastKeyword */);
            const binaryOperators = tokenRangeFromRange(29 /* FirstBinaryOperator */, 78 /* LastBinaryOperator */);
            const binaryKeywordOperators = [
                101 /* InKeyword */,
                102 /* InstanceOfKeyword */,
                162 /* OfKeyword */,
                128 /* AsKeyword */,
                140 /* IsKeyword */,
                150 /* SatisfiesKeyword */
            ];
            const unaryPrefixOperators = [45 /* PlusPlusToken */, 46 /* MinusMinusToken */, 54 /* TildeToken */, 53 /* ExclamationToken */];
            const unaryPrefixExpressions = [
                8 /* NumericLiteral */,
                9 /* BigIntLiteral */,
                79 /* Identifier */,
                20 /* OpenParenToken */,
                22 /* OpenBracketToken */,
                18 /* OpenBraceToken */,
                108 /* ThisKeyword */,
                103 /* NewKeyword */
            ];
            const unaryPreincrementExpressions = [79 /* Identifier */, 20 /* OpenParenToken */, 108 /* ThisKeyword */, 103 /* NewKeyword */];
            const unaryPostincrementExpressions = [79 /* Identifier */, 21 /* CloseParenToken */, 23 /* CloseBracketToken */, 103 /* NewKeyword */];
            const unaryPredecrementExpressions = [79 /* Identifier */, 20 /* OpenParenToken */, 108 /* ThisKeyword */, 103 /* NewKeyword */];
            const unaryPostdecrementExpressions = [79 /* Identifier */, 21 /* CloseParenToken */, 23 /* CloseBracketToken */, 103 /* NewKeyword */];
            const comments = [2 /* SingleLineCommentTrivia */, 3 /* MultiLineCommentTrivia */];
            const typeNames = [79 /* Identifier */, ...typeKeywords];
            const functionOpenBraceLeftTokenRange = anyTokenIncludingMultilineComments;
            const typeScriptOpenBraceLeftTokenRange = tokenRangeFrom([79 /* Identifier */, 3 /* MultiLineCommentTrivia */, 84 /* ClassKeyword */, 93 /* ExportKeyword */, 100 /* ImportKeyword */]);
            const controlOpenBraceLeftTokenRange = tokenRangeFrom([21 /* CloseParenToken */, 3 /* MultiLineCommentTrivia */, 90 /* DoKeyword */, 111 /* TryKeyword */, 96 /* FinallyKeyword */, 91 /* ElseKeyword */]);
            const highPriorityCommonRules = [
                // Leave comments alone
                rule("IgnoreBeforeComment", anyToken, comments, anyContext, 1 /* StopProcessingSpaceActions */),
                rule("IgnoreAfterLineComment", 2 /* SingleLineCommentTrivia */, anyToken, anyContext, 1 /* StopProcessingSpaceActions */),
                rule("NotSpaceBeforeColon", anyToken, 58 /* ColonToken */, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], 16 /* DeleteSpace */),
                rule("SpaceAfterColon", 58 /* ColonToken */, anyToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], 4 /* InsertSpace */),
                rule("NoSpaceBeforeQuestionMark", anyToken, 57 /* QuestionToken */, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], 16 /* DeleteSpace */),
                // insert space after '?' only when it is used in conditional operator
                rule("SpaceAfterQuestionMarkInConditionalOperator", 57 /* QuestionToken */, anyToken, [isNonJsxSameLineTokenContext, isConditionalOperatorContext], 4 /* InsertSpace */),
                // in other cases there should be no space between '?' and next token
                rule("NoSpaceAfterQuestionMark", 57 /* QuestionToken */, anyToken, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeDot", anyToken, [24 /* DotToken */, 28 /* QuestionDotToken */], [isNonJsxSameLineTokenContext, isNotPropertyAccessOnIntegerLiteral], 16 /* DeleteSpace */),
                rule("NoSpaceAfterDot", [24 /* DotToken */, 28 /* QuestionDotToken */], anyToken, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBetweenImportParenInImportType", 100 /* ImportKeyword */, 20 /* OpenParenToken */, [isNonJsxSameLineTokenContext, isImportTypeContext], 16 /* DeleteSpace */),
                // Special handling of unary operators.
                // Prefix operators generally shouldn't have a space between
                // them and their target unary expression.
                rule("NoSpaceAfterUnaryPrefixOperator", unaryPrefixOperators, unaryPrefixExpressions, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterUnaryPreincrementOperator", 45 /* PlusPlusToken */, unaryPreincrementExpressions, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterUnaryPredecrementOperator", 46 /* MinusMinusToken */, unaryPredecrementExpressions, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeUnaryPostincrementOperator", unaryPostincrementExpressions, 45 /* PlusPlusToken */, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeUnaryPostdecrementOperator", unaryPostdecrementExpressions, 46 /* MinusMinusToken */, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], 16 /* DeleteSpace */),
                // More unary operator special-casing.
                // DevDiv 181814: Be careful when removing leading whitespace
                // around unary operators.  Examples:
                //      1 - -2  --X--> 1--2
                //      a + ++b --X--> a+++b
                rule("SpaceAfterPostincrementWhenFollowedByAdd", 45 /* PlusPlusToken */, 39 /* PlusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterAddWhenFollowedByUnaryPlus", 39 /* PlusToken */, 39 /* PlusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterAddWhenFollowedByPreincrement", 39 /* PlusToken */, 45 /* PlusPlusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterPostdecrementWhenFollowedBySubtract", 46 /* MinusMinusToken */, 40 /* MinusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", 40 /* MinusToken */, 40 /* MinusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterSubtractWhenFollowedByPredecrement", 40 /* MinusToken */, 46 /* MinusMinusToken */, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterCloseBrace", 19 /* CloseBraceToken */, [27 /* CommaToken */, 26 /* SemicolonToken */], [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // For functions and control block place } on a new line [multi-line rule]
                rule("NewLineBeforeCloseBraceInBlockContext", anyTokenIncludingMultilineComments, 19 /* CloseBraceToken */, [isMultilineBlockContext], 8 /* InsertNewLine */),
                // Space/new line after }.
                rule("SpaceAfterCloseBrace", 19 /* CloseBraceToken */, anyTokenExcept(21 /* CloseParenToken */), [isNonJsxSameLineTokenContext, isAfterCodeBlockContext], 4 /* InsertSpace */),
                // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
                // Also should not apply to })
                rule("SpaceBetweenCloseBraceAndElse", 19 /* CloseBraceToken */, 91 /* ElseKeyword */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBetweenCloseBraceAndWhile", 19 /* CloseBraceToken */, 115 /* WhileKeyword */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenEmptyBraceBrackets", 18 /* OpenBraceToken */, 19 /* CloseBraceToken */, [isNonJsxSameLineTokenContext, isObjectContext], 16 /* DeleteSpace */),
                // Add a space after control dec context if the next character is an open bracket ex: 'if (false)[a, b] = [1, 2];' -> 'if (false) [a, b] = [1, 2];'
                rule("SpaceAfterConditionalClosingParen", 21 /* CloseParenToken */, 22 /* OpenBracketToken */, [isControlDeclContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenFunctionKeywordAndStar", 98 /* FunctionKeyword */, 41 /* AsteriskToken */, [isFunctionDeclarationOrFunctionExpressionContext], 16 /* DeleteSpace */),
                rule("SpaceAfterStarInGeneratorDeclaration", 41 /* AsteriskToken */, 79 /* Identifier */, [isFunctionDeclarationOrFunctionExpressionContext], 4 /* InsertSpace */),
                rule("SpaceAfterFunctionInFuncDecl", 98 /* FunctionKeyword */, anyToken, [isFunctionDeclContext], 4 /* InsertSpace */),
                // Insert new line after { and before } in multi-line contexts.
                rule("NewLineAfterOpenBraceInBlockContext", 18 /* OpenBraceToken */, anyToken, [isMultilineBlockContext], 8 /* InsertNewLine */),
                // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
                // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
                //      get x() {}
                //      set x(val) {}
                rule("SpaceAfterGetSetInMember", [137 /* GetKeyword */, 151 /* SetKeyword */], 79 /* Identifier */, [isFunctionDeclContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenYieldKeywordAndStar", 125 /* YieldKeyword */, 41 /* AsteriskToken */, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], 16 /* DeleteSpace */),
                rule("SpaceBetweenYieldOrYieldStarAndOperand", [125 /* YieldKeyword */, 41 /* AsteriskToken */], anyToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], 4 /* InsertSpace */),
                rule("NoSpaceBetweenReturnAndSemicolon", 105 /* ReturnKeyword */, 26 /* SemicolonToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("SpaceAfterCertainKeywords", [113 /* VarKeyword */, 109 /* ThrowKeyword */, 103 /* NewKeyword */, 89 /* DeleteKeyword */, 105 /* ReturnKeyword */, 112 /* TypeOfKeyword */, 133 /* AwaitKeyword */], anyToken, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceAfterLetConstInVariableDeclaration", [119 /* LetKeyword */, 85 /* ConstKeyword */], anyToken, [isNonJsxSameLineTokenContext, isStartOfVariableDeclarationList], 4 /* InsertSpace */),
                rule("NoSpaceBeforeOpenParenInFuncCall", anyToken, 20 /* OpenParenToken */, [isNonJsxSameLineTokenContext, isFunctionCallOrNewContext, isPreviousTokenNotComma], 16 /* DeleteSpace */),
                // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
                rule("SpaceBeforeBinaryKeywordOperator", anyToken, binaryKeywordOperators, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterBinaryKeywordOperator", binaryKeywordOperators, anyToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterVoidOperator", 114 /* VoidKeyword */, anyToken, [isNonJsxSameLineTokenContext, isVoidOpContext], 4 /* InsertSpace */),
                // Async-await
                rule("SpaceBetweenAsyncAndOpenParen", 132 /* AsyncKeyword */, 20 /* OpenParenToken */, [isArrowFunctionContext, isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBetweenAsyncAndFunctionKeyword", 132 /* AsyncKeyword */, [98 /* FunctionKeyword */, 79 /* Identifier */], [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                // Template string
                rule("NoSpaceBetweenTagAndTemplateString", [79 /* Identifier */, 21 /* CloseParenToken */], [14 /* NoSubstitutionTemplateLiteral */, 15 /* TemplateHead */], [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // JSX opening elements
                rule("SpaceBeforeJsxAttribute", anyToken, 79 /* Identifier */, [isNextTokenParentJsxAttribute, isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBeforeSlashInJsxOpeningElement", anyToken, 43 /* SlashToken */, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", 43 /* SlashToken */, 31 /* GreaterThanToken */, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeEqualInJsxAttribute", anyToken, 63 /* EqualsToken */, [isJsxAttributeContext, isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterEqualInJsxAttribute", 63 /* EqualsToken */, anyToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // TypeScript-specific rules
                // Use of module as a function call. e.g.: import m2 = module("m2");
                rule("NoSpaceAfterModuleImport", [142 /* ModuleKeyword */, 147 /* RequireKeyword */], 20 /* OpenParenToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Add a space around certain TypeScript keywords
                rule("SpaceAfterCertainTypeScriptKeywords", [
                    126 /* AbstractKeyword */,
                    127 /* AccessorKeyword */,
                    84 /* ClassKeyword */,
                    136 /* DeclareKeyword */,
                    88 /* DefaultKeyword */,
                    92 /* EnumKeyword */,
                    93 /* ExportKeyword */,
                    94 /* ExtendsKeyword */,
                    137 /* GetKeyword */,
                    117 /* ImplementsKeyword */,
                    100 /* ImportKeyword */,
                    118 /* InterfaceKeyword */,
                    142 /* ModuleKeyword */,
                    143 /* NamespaceKeyword */,
                    121 /* PrivateKeyword */,
                    123 /* PublicKeyword */,
                    122 /* ProtectedKeyword */,
                    146 /* ReadonlyKeyword */,
                    151 /* SetKeyword */,
                    124 /* StaticKeyword */,
                    154 /* TypeKeyword */,
                    158 /* FromKeyword */,
                    141 /* KeyOfKeyword */,
                    138 /* InferKeyword */
                ], anyToken, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBeforeCertainTypeScriptKeywords", anyToken, [94 /* ExtendsKeyword */, 117 /* ImplementsKeyword */, 158 /* FromKeyword */], [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
                rule("SpaceAfterModuleName", 10 /* StringLiteral */, 18 /* OpenBraceToken */, [isModuleDeclContext], 4 /* InsertSpace */),
                // Lambda expressions
                rule("SpaceBeforeArrow", anyToken, 38 /* EqualsGreaterThanToken */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceAfterArrow", 38 /* EqualsGreaterThanToken */, anyToken, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                // Optional parameters and let args
                rule("NoSpaceAfterEllipsis", 25 /* DotDotDotToken */, 79 /* Identifier */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterOptionalParameters", 57 /* QuestionToken */, [21 /* CloseParenToken */, 27 /* CommaToken */], [isNonJsxSameLineTokenContext, isNotBinaryOpContext], 16 /* DeleteSpace */),
                // Remove spaces in empty interface literals. e.g.: x: {}
                rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", 18 /* OpenBraceToken */, 19 /* CloseBraceToken */, [isNonJsxSameLineTokenContext, isObjectTypeContext], 16 /* DeleteSpace */),
                // generics and type assertions
                rule("NoSpaceBeforeOpenAngularBracket", typeNames, 29 /* LessThanToken */, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], 16 /* DeleteSpace */),
                rule("NoSpaceBetweenCloseParenAndAngularBracket", 21 /* CloseParenToken */, 29 /* LessThanToken */, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterOpenAngularBracket", 29 /* LessThanToken */, anyToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeCloseAngularBracket", anyToken, 31 /* GreaterThanToken */, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterCloseAngularBracket", 31 /* GreaterThanToken */, [20 /* OpenParenToken */, 22 /* OpenBracketToken */, 31 /* GreaterThanToken */, 27 /* CommaToken */], [
                    isNonJsxSameLineTokenContext,
                    isTypeArgumentOrParameterOrAssertionContext,
                    isNotFunctionDeclContext,
                    isNonTypeAssertionContext
                ], 16 /* DeleteSpace */),
                // decorators
                rule("SpaceBeforeAt", [21 /* CloseParenToken */, 79 /* Identifier */], 59 /* AtToken */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterAt", 59 /* AtToken */, anyToken, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Insert space after @ in decorator
                rule("SpaceAfterDecorator", anyToken, [
                    126 /* AbstractKeyword */,
                    79 /* Identifier */,
                    93 /* ExportKeyword */,
                    88 /* DefaultKeyword */,
                    84 /* ClassKeyword */,
                    124 /* StaticKeyword */,
                    123 /* PublicKeyword */,
                    121 /* PrivateKeyword */,
                    122 /* ProtectedKeyword */,
                    137 /* GetKeyword */,
                    151 /* SetKeyword */,
                    22 /* OpenBracketToken */,
                    41 /* AsteriskToken */
                ], [isEndOfDecoratorContextOnSameLine], 4 /* InsertSpace */),
                rule("NoSpaceBeforeNonNullAssertionOperator", anyToken, 53 /* ExclamationToken */, [isNonJsxSameLineTokenContext, isNonNullAssertionContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterNewKeywordOnConstructorSignature", 103 /* NewKeyword */, 20 /* OpenParenToken */, [isNonJsxSameLineTokenContext, isConstructorSignatureContext], 16 /* DeleteSpace */),
                rule("SpaceLessThanAndNonJSXTypeAnnotation", 29 /* LessThanToken */, 29 /* LessThanToken */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */)
            ];
            const userConfigurableRules = [
                // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
                rule("SpaceAfterConstructor", 135 /* ConstructorKeyword */, 20 /* OpenParenToken */, [isOptionEnabled("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterConstructor", 135 /* ConstructorKeyword */, 20 /* OpenParenToken */, [isOptionDisabledOrUndefined("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("SpaceAfterComma", 27 /* CommaToken */, anyToken, [isOptionEnabled("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNextTokenNotCloseBracket, isNextTokenNotCloseParen], 4 /* InsertSpace */),
                rule("NoSpaceAfterComma", 27 /* CommaToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext], 16 /* DeleteSpace */),
                // Insert space after function keyword for anonymous functions
                rule("SpaceAfterAnonymousFunctionKeyword", [98 /* FunctionKeyword */, 41 /* AsteriskToken */], 20 /* OpenParenToken */, [isOptionEnabled("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterAnonymousFunctionKeyword", [98 /* FunctionKeyword */, 41 /* AsteriskToken */], 20 /* OpenParenToken */, [isOptionDisabledOrUndefined("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], 16 /* DeleteSpace */),
                // Insert space after keywords in control flow statements
                rule("SpaceAfterKeywordInControl", keywords, 20 /* OpenParenToken */, [isOptionEnabled("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterKeywordInControl", keywords, 20 /* OpenParenToken */, [isOptionDisabledOrUndefined("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], 16 /* DeleteSpace */),
                // Insert space after opening and before closing nonempty parenthesis
                rule("SpaceAfterOpenParen", 20 /* OpenParenToken */, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBeforeCloseParen", anyToken, 21 /* CloseParenToken */, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBetweenOpenParens", 20 /* OpenParenToken */, 20 /* OpenParenToken */, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenParens", 20 /* OpenParenToken */, 21 /* CloseParenToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterOpenParen", 20 /* OpenParenToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeCloseParen", anyToken, 21 /* CloseParenToken */, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Insert space after opening and before closing nonempty brackets
                rule("SpaceAfterOpenBracket", 22 /* OpenBracketToken */, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("SpaceBeforeCloseBracket", anyToken, 23 /* CloseBracketToken */, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenBrackets", 22 /* OpenBracketToken */, 23 /* CloseBracketToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterOpenBracket", 22 /* OpenBracketToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeCloseBracket", anyToken, 23 /* CloseBracketToken */, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
                rule("SpaceAfterOpenBrace", 18 /* OpenBraceToken */, anyToken, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], 4 /* InsertSpace */),
                rule("SpaceBeforeCloseBrace", anyToken, 19 /* CloseBraceToken */, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], 4 /* InsertSpace */),
                rule("NoSpaceBetweenEmptyBraceBrackets", 18 /* OpenBraceToken */, 19 /* CloseBraceToken */, [isNonJsxSameLineTokenContext, isObjectContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterOpenBrace", 18 /* OpenBraceToken */, anyToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeCloseBrace", anyToken, 19 /* CloseBraceToken */, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Insert a space after opening and before closing empty brace brackets
                rule("SpaceBetweenEmptyBraceBrackets", 18 /* OpenBraceToken */, 19 /* CloseBraceToken */, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces")], 4 /* InsertSpace */),
                rule("NoSpaceBetweenEmptyBraceBrackets", 18 /* OpenBraceToken */, 19 /* CloseBraceToken */, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // Insert space after opening and before closing template string braces
                rule("SpaceAfterTemplateHeadAndMiddle", [15 /* TemplateHead */, 16 /* TemplateMiddle */], anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], 4 /* InsertSpace */, 1 /* CanDeleteNewLines */),
                rule("SpaceBeforeTemplateMiddleAndTail", anyToken, [16 /* TemplateMiddle */, 17 /* TemplateTail */], [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterTemplateHeadAndMiddle", [15 /* TemplateHead */, 16 /* TemplateMiddle */], anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], 16 /* DeleteSpace */, 1 /* CanDeleteNewLines */),
                rule("NoSpaceBeforeTemplateMiddleAndTail", anyToken, [16 /* TemplateMiddle */, 17 /* TemplateTail */], [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // No space after { and before } in JSX expression
                rule("SpaceAfterOpenBraceInJsxExpression", 18 /* OpenBraceToken */, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], 4 /* InsertSpace */),
                rule("SpaceBeforeCloseBraceInJsxExpression", anyToken, 19 /* CloseBraceToken */, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterOpenBraceInJsxExpression", 18 /* OpenBraceToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], 16 /* DeleteSpace */),
                rule("NoSpaceBeforeCloseBraceInJsxExpression", anyToken, 19 /* CloseBraceToken */, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], 16 /* DeleteSpace */),
                // Insert space after semicolon in for statement
                rule("SpaceAfterSemicolonInFor", 26 /* SemicolonToken */, anyToken, [isOptionEnabled("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterSemicolonInFor", 26 /* SemicolonToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], 16 /* DeleteSpace */),
                // Insert space before and after binary operators
                rule("SpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("SpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], 4 /* InsertSpace */),
                rule("NoSpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], 16 /* DeleteSpace */),
                rule("SpaceBeforeOpenParenInFuncDecl", anyToken, 20 /* OpenParenToken */, [isOptionEnabled("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], 4 /* InsertSpace */),
                rule("NoSpaceBeforeOpenParenInFuncDecl", anyToken, 20 /* OpenParenToken */, [isOptionDisabledOrUndefined("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], 16 /* DeleteSpace */),
                // Open Brace braces after control block
                rule("NewLineBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionEnabled("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isBeforeMultilineBlockContext], 8 /* InsertNewLine */, 1 /* CanDeleteNewLines */),
                // Open Brace braces after function
                // TypeScript: Function can have return types, which can be made of tons of different token kinds
                rule("NewLineBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeMultilineBlockContext], 8 /* InsertNewLine */, 1 /* CanDeleteNewLines */),
                // Open Brace braces after TypeScript module/class/interface
                rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isBeforeMultilineBlockContext], 8 /* InsertNewLine */, 1 /* CanDeleteNewLines */),
                rule("SpaceAfterTypeAssertion", 31 /* GreaterThanToken */, anyToken, [isOptionEnabled("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], 4 /* InsertSpace */),
                rule("NoSpaceAfterTypeAssertion", 31 /* GreaterThanToken */, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], 16 /* DeleteSpace */),
                rule("SpaceBeforeTypeAnnotation", anyToken, [57 /* QuestionToken */, 58 /* ColonToken */], [isOptionEnabled("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], 4 /* InsertSpace */),
                rule("NoSpaceBeforeTypeAnnotation", anyToken, [57 /* QuestionToken */, 58 /* ColonToken */], [isOptionDisabledOrUndefined("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], 16 /* DeleteSpace */),
                rule("NoOptionalSemicolon", 26 /* SemicolonToken */, anyTokenIncludingEOF, [optionEquals("semicolons", "remove" /* Remove */), isSemicolonDeletionContext], 32 /* DeleteToken */),
                rule("OptionalSemicolon", anyToken, anyTokenIncludingEOF, [optionEquals("semicolons", "insert" /* Insert */), isSemicolonInsertionContext], 64 /* InsertTrailingSemicolon */)
            ];
            const lowPriorityCommonRules = [
                // Space after keyword but not before ; or : or ?
                rule("NoSpaceBeforeSemicolon", anyToken, 26 /* SemicolonToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("SpaceBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], 4 /* InsertSpace */, 1 /* CanDeleteNewLines */),
                rule("SpaceBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], 4 /* InsertSpace */, 1 /* CanDeleteNewLines */),
                rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, 18 /* OpenBraceToken */, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], 4 /* InsertSpace */, 1 /* CanDeleteNewLines */),
                rule("NoSpaceBeforeComma", anyToken, 27 /* CommaToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                // No space before and after indexer `x[]`
                rule("NoSpaceBeforeOpenBracket", anyTokenExcept(132 /* AsyncKeyword */, 82 /* CaseKeyword */), 22 /* OpenBracketToken */, [isNonJsxSameLineTokenContext], 16 /* DeleteSpace */),
                rule("NoSpaceAfterCloseBracket", 23 /* CloseBracketToken */, anyToken, [isNonJsxSameLineTokenContext, isNotBeforeBlockInFunctionDeclarationContext], 16 /* DeleteSpace */),
                rule("SpaceAfterSemicolon", 26 /* SemicolonToken */, anyToken, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                // Remove extra space between for and await
                rule("SpaceBetweenForAndAwaitKeyword", 97 /* ForKeyword */, 133 /* AwaitKeyword */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */),
                // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
                // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
                rule("SpaceBetweenStatements", [21 /* CloseParenToken */, 90 /* DoKeyword */, 91 /* ElseKeyword */, 82 /* CaseKeyword */], anyToken, [isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNotForContext], 4 /* InsertSpace */),
                // This low-pri rule takes care of "try {", "catch {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
                rule("SpaceAfterTryCatchFinally", [111 /* TryKeyword */, 83 /* CatchKeyword */, 96 /* FinallyKeyword */], 18 /* OpenBraceToken */, [isNonJsxSameLineTokenContext], 4 /* InsertSpace */)
            ];
            return [
                ...highPriorityCommonRules,
                ...userConfigurableRules,
                ...lowPriorityCommonRules
            ];
        }