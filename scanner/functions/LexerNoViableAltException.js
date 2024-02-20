function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
	RecognitionException.call(this, {message:"", recognizer:lexer, input:input, ctx:null});
    this.startIndex = startIndex;
    this.deadEndConfigs = deadEndConfigs;
    return this;
}