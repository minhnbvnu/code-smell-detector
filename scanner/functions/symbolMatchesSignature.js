function symbolMatchesSignature(s, calledDeclaration) {
            var _a2;
            return s === calledDeclaration.symbol || s === calledDeclaration.symbol.parent || isAssignmentExpression(calledDeclaration.parent) || !isCallLikeExpression(calledDeclaration.parent) && s === ((_a2 = tryCast(calledDeclaration.parent, canHaveSymbol)) == null ? void 0 : _a2.symbol);
        }