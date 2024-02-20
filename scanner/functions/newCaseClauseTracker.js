function newCaseClauseTracker(checker, clauses) {
            const existingStrings = /* @__PURE__ */ new Set();
            const existingNumbers = /* @__PURE__ */ new Set();
            const existingBigInts = /* @__PURE__ */ new Set();
            for (const clause of clauses) {
                if (!isDefaultClause(clause)) {
                    const expression = skipParentheses(clause.expression);
                    if (isLiteralExpression(expression)) {
                        switch (expression.kind) {
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 10 /* StringLiteral */:
                                existingStrings.add(expression.text);
                                break;
                            case 8 /* NumericLiteral */:
                                existingNumbers.add(parseInt(expression.text));
                                break;
                            case 9 /* BigIntLiteral */:
                                const parsedBigInt = parseBigInt(endsWith(expression.text, "n") ? expression.text.slice(0, -1) : expression.text);
                                if (parsedBigInt) {
                                    existingBigInts.add(pseudoBigIntToString(parsedBigInt));
                                }
                                break;
                        }
                    }
                    else {
                        const symbol = checker.getSymbolAtLocation(clause.expression);
                        if (symbol && symbol.valueDeclaration && isEnumMember(symbol.valueDeclaration)) {
                            const enumValue = checker.getConstantValue(symbol.valueDeclaration);
                            if (enumValue !== void 0) {
                                addValue(enumValue);
                            }
                        }
                    }
                }
            }
            return {
                addValue,
                hasValue
            };
            function addValue(value) {
                switch (typeof value) {
                    case "string":
                        existingStrings.add(value);
                        break;
                    case "number":
                        existingNumbers.add(value);
                }
            }
            function hasValue(value) {
                switch (typeof value) {
                    case "string":
                        return existingStrings.has(value);
                    case "number":
                        return existingNumbers.has(value);
                    case "object":
                        return existingBigInts.has(pseudoBigIntToString(value));
                }
            }
        }