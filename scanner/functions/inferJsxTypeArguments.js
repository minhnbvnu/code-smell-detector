function inferJsxTypeArguments(node, signature, checkMode, context) {
                const paramType = getEffectiveFirstArgumentForJsxSignature(signature, node);
                const checkAttrType = checkExpressionWithContextualType(node.attributes, paramType, context, checkMode);
                inferTypes(context.inferences, checkAttrType, paramType);
                return getInferredTypes(context);
            }