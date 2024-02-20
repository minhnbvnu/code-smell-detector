function insideCondition() {
                        var cond = self.negatedCondition(needsParens) || self.parenthesisCondition(needsParens);
                        if (!cond && !needsParens) {
                            return self.atomicCondition(needsParens);
                        }
                        return cond;
                    }