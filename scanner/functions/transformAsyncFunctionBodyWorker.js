function transformAsyncFunctionBodyWorker(body, start) {
                if (isBlock(body)) {
                    return factory2.updateBlock(body, visitNodes2(body.statements, asyncBodyVisitor, isStatement, start));
                }
                else {
                    return factory2.converters.convertToFunctionBlock(Debug.checkDefined(visitNode(body, asyncBodyVisitor, isConciseBody)));
                }
            }