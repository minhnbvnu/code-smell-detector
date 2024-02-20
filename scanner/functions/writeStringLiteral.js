function writeStringLiteral(s) {
                writer.writeStringLiteral(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }