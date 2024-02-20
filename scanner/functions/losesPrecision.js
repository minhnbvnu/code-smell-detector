function losesPrecision(node) {
                return isBaseTen(node) ? baseTenLosesPrecision(node) : notBaseTenLosesPrecision(node);
            }