function rawWrite(s) {
                writer.rawWrite(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }