function emitParametersForArrow(parentNode, parameters) {
                if (canEmitSimpleArrowHead(parentNode, parameters)) {
                    emitList(parentNode, parameters, 2576 /* Parameters */ & ~2048 /* Parenthesis */);
                }
                else {
                    emitParameters(parentNode, parameters);
                }
            }