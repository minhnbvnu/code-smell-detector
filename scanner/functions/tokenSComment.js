function tokenSComment(stream, state) {// SComment = Slash comment
    stream.skipToEnd();
	state.tokenize = tokenBase;
    return ret("comment", "comment");
  }