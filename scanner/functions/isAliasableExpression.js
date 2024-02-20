function isAliasableExpression(e) {
            return isEntityNameExpression(e) || isClassExpression(e);
        }