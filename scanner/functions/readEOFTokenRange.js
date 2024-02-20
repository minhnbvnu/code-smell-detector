function readEOFTokenRange() {
                Debug.assert(isOnEOF());
                return createTextRangeWithKind(scanner2.getStartPos(), scanner2.getTextPos(), 1 /* EndOfFileToken */);
            }