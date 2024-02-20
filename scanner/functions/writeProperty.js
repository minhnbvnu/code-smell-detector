function writeProperty(s) {
                writer.writeProperty(s);
                setLastNonTriviaPosition(s, 
                /*force*/
                false);
            }