function createBindingsStringEvaluator(bindingsString, scopesCount) {
        var rewrittenBindings = " { " + ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(bindingsString) + " } ";
        return ko.utils.buildEvalWithinScopeFunction(rewrittenBindings, scopesCount);
    }