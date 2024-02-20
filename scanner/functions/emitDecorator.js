function emitDecorator(decorator) {
                writePunctuation("@");
                emitExpression(decorator.expression, parenthesizer.parenthesizeLeftSideOfAccess);
            }