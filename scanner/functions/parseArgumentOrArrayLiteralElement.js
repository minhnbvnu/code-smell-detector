function parseArgumentOrArrayLiteralElement() {
                        return token() === 25 /* DotDotDotToken */ ? parseSpreadElement() : token() === 27 /* CommaToken */ ? finishNode(factory2.createOmittedExpression(), getNodePos()) : parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        true);
                    }