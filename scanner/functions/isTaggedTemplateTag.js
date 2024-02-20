function isTaggedTemplateTag(node, includeElementAccess = false, skipPastOuterExpressions = false) {
            return isCalleeWorker(node, isTaggedTemplateExpression, selectTagOfTaggedTemplateExpression, includeElementAccess, skipPastOuterExpressions);
        }