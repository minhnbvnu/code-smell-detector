function isAliasableOrJsExpression(e) {
                return isAliasableExpression(e) || isFunctionExpression(e) && isJSConstructor(e);
            }