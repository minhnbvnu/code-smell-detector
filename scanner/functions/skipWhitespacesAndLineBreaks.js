function skipWhitespacesAndLineBreaks(text, start) {
            return skipTrivia(text, start, 
            /*stopAfterLineBreak*/
            false, 
            /*stopAtComments*/
            true);
        }