function isReadonlyKeywordOrPlusOrMinusToken(node) {
            return isReadonlyKeyword(node) || isPlusToken(node) || isMinusToken(node);
        }