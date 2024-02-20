function myIndent(state,textAfter) {
    var indent = cmCfg.indentUnit;
    var outdentWords = ["after","catch"];
    var token = (peekToken(state)).token;
    var wordAfter = takewhile(textAfter,/[^a-z]/);

    if (isMember(token,openParenWords)) {
      return (peekToken(state)).column+token.length;
    }else if (token == "." || token == ""){
      return 0;
    }else if (token == "->") {
      if (wordAfter == "end") {
        return peekToken(state,2).column;
      }else if (peekToken(state,2).token == "fun") {
        return peekToken(state,2).column+indent;
      }else{
        return (peekToken(state)).indent+indent;
      }
    }else if (isMember(wordAfter,outdentWords)) {
      return (peekToken(state)).indent;
    }else{
      return (peekToken(state)).column+indent;
    }
  }