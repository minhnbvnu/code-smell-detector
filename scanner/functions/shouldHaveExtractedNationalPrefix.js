function shouldHaveExtractedNationalPrefix(i,o,s){return!(matchesEntirely(i,s.nationalNumberPattern())&&!matchesEntirely(o,s.nationalNumberPattern()))}