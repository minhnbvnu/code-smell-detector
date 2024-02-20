function deserializeGrammars(grammars) {
        if (grammars) {
            var speechRecognitionList = new webkitSpeechGrammarList();
            for (let grammar of grammars) {
                if (grammar.src)
                    speechRecognitionList.addFromString(grammar.src, grammar.weight);
                else if (grammar.uri)
                    speechRecognitionList.addFromURI(grammar.uri, grammar.weight);
            }
            return speechRecognitionList;
        }
        else
            return null;
    }