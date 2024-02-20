function checkExpressionWithContextualType(node, contextualType, inferenceContext, checkMode) {
                const contextNode = getContextNode2(node);
                pushContextualType(contextNode, contextualType, 
                /*isCache*/
                false);
                pushInferenceContext(contextNode, inferenceContext);
                const type = checkExpression(node, checkMode | 1 /* Contextual */ | (inferenceContext ? 2 /* Inferential */ : 0));
                if (inferenceContext && inferenceContext.intraExpressionInferenceSites) {
                    inferenceContext.intraExpressionInferenceSites = void 0;
                }
                const result = maybeTypeOfKind(type, 2944 /* Literal */) && isLiteralOfContextualType(type, instantiateContextualType(contextualType, node, 
                /*contextFlags*/
                void 0)) ? getRegularTypeOfLiteralType(type) : type;
                popInferenceContext();
                popContextualType();
                return result;
            }