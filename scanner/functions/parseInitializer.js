function parseInitializer() {
                        return parseOptional(63 /* EqualsToken */) ? parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        true) : void 0;
                    }