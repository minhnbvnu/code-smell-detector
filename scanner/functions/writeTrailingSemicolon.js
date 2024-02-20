function writeTrailingSemicolon(s) {
                writer.writeTrailingSemicolon(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }