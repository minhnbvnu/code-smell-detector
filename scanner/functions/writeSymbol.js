function writeSymbol(s, sym) {
                writer.writeSymbol(s, sym);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }