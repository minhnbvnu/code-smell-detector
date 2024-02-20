function aEnclosesB(a, b) {
        while(a.container) {
            if(a == b || aLexicallyEnclosesB(a.container, b)) {
                return true;
            }
            a = a.container;
        }
        return false;
    }