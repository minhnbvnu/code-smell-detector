function parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) {
                        const tokenPos = scanner2.getTokenPos();
                        if (notParenthesizedArrow == null ? void 0 : notParenthesizedArrow.has(tokenPos)) {
                            return void 0;
                        }
                        const result = parseParenthesizedArrowFunctionExpression(
                        /*allowAmbiguity*/
                        false, allowReturnTypeInArrowFunction);
                        if (!result) {
                            (notParenthesizedArrow || (notParenthesizedArrow = /* @__PURE__ */ new Set())).add(tokenPos);
                        }
                        return result;
                    }