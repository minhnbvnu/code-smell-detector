function isContextualKeyword(token) {
            return 126 /* FirstContextualKeyword */ <= token && token <= 162 /* LastContextualKeyword */;
        }