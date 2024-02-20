function writeKeyword(s) {
                writer.writeKeyword(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }