function bindOptionalChainRest(node) {
                switch (node.kind) {
                    case 208 /* PropertyAccessExpression */:
                        bind(node.questionDotToken);
                        bind(node.name);
                        break;
                    case 209 /* ElementAccessExpression */:
                        bind(node.questionDotToken);
                        bind(node.argumentExpression);
                        break;
                    case 210 /* CallExpression */:
                        bind(node.questionDotToken);
                        bindEach(node.typeArguments);
                        bindEach(node.arguments);
                        break;
                }
            }