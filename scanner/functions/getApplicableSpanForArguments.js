function getApplicableSpanForArguments(argumentsList, sourceFile) {
            const applicableSpanStart = argumentsList.getFullStart();
            const applicableSpanEnd = skipTrivia(sourceFile.text, argumentsList.getEnd(), 
            /*stopAfterLineBreak*/
            false);
            return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }