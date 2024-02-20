function tokenLineComment(stream,state){
    return stream.skipToEnd(),/\/\s*$/.test(stream.current())?(state.tokenize=tokenBlockComment)(stream,state):(state.tokenize=tokenBase),"comment";
  }