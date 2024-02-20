function getWordSpans(word, stringToWordSpans) {
            let spans = stringToWordSpans.get(word);
            if (!spans) {
                stringToWordSpans.set(word, spans = breakIntoWordSpans(word));
            }
            return spans;
        }