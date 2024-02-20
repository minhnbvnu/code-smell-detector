function tryConditionFollowedByParenthesis(me) {
                        var body;
                        parserInput.save();
                        body = me.condition(needsParens);
                        if (!body) {
                            parserInput.restore();
                            return;
                        }
                        if (!parserInput.$char(')')) {
                            parserInput.restore();
                            return;
                        }
                        parserInput.forget();
                        return body;
                    }