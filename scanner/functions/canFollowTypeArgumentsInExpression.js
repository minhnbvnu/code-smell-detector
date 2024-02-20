function canFollowTypeArgumentsInExpression() {
                        switch (token()) {
                            case 20 /* OpenParenToken */:
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 15 /* TemplateHead */:
                                return true;
                            case 29 /* LessThanToken */:
                            case 31 /* GreaterThanToken */:
                            case 39 /* PlusToken */:
                            case 40 /* MinusToken */:
                                return false;
                        }
                        return scanner2.hasPrecedingLineBreak() || isBinaryOperator2() || !isStartOfExpression();
                    }