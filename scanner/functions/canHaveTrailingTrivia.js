function canHaveTrailingTrivia(token) {
        switch (token.kind) {
            case ts.SyntaxKind.CloseBraceToken:
                // after a JsxExpression inside a JsxElement's body can only be other JsxChild, but no trivia
                return token.parent.kind !== ts.SyntaxKind.JsxExpression || !isJsxElementOrFragment(token.parent.parent);
            case ts.SyntaxKind.GreaterThanToken:
                switch (token.parent.kind) {
                    case ts.SyntaxKind.JsxOpeningElement:
                        // if end is not equal, this is part of the type arguments list. in all other cases it would be inside the element body
                        return token.end !== token.parent.end;
                    case ts.SyntaxKind.JsxOpeningFragment:
                        return false; // would be inside the fragment
                    case ts.SyntaxKind.JsxSelfClosingElement:
                        return token.end !== token.parent.end || // if end is not equal, this is part of the type arguments list
                            !isJsxElementOrFragment(token.parent.parent); // there's only trailing trivia if it's the end of the top element
                    case ts.SyntaxKind.JsxClosingElement:
                    case ts.SyntaxKind.JsxClosingFragment:
                        // there's only trailing trivia if it's the end of the top element
                        return !isJsxElementOrFragment(token.parent.parent.parent);
                }
        }
        return true;
    }