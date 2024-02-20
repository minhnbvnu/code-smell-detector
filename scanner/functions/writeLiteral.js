function writeLiteral(s) {
                writer.writeLiteral(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                true);
            }