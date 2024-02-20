function setTextPos(textPos) {
                Debug.assert(textPos >= 0);
                pos = textPos;
                startPos = textPos;
                tokenPos = textPos;
                token = 0 /* Unknown */;
                tokenValue = void 0;
                tokenFlags = 0 /* None */;
            }