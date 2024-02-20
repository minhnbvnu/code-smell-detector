function flattenChain(chain) {
                Debug.assertNotNode(chain, isNonNullChain);
                const links = [chain];
                while (!chain.questionDotToken && !isTaggedTemplateExpression(chain)) {
                    chain = cast(skipPartiallyEmittedExpressions(chain.expression), isOptionalChain);
                    Debug.assertNotNode(chain, isNonNullChain);
                    links.unshift(chain);
                }
                return { expression: chain.expression, chain: links };
            }