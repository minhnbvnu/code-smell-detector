function writeParameter(s) {
                writer.writeParameter(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }