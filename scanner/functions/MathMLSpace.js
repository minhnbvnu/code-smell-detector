function MathMLSpace(script, size) {
        return (script ? size < SMALLSIZE ? 0 : SMALLSIZE : size);
    }