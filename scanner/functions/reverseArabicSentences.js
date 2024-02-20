function reverseArabicSentences() {
	    var this$1 = this;

	    var ranges = this.tokenizer.getContextRanges('arabicSentence');
	    ranges.forEach(function (range) {
	        var rangeTokens = this$1.tokenizer.getRangeTokens(range);
	        this$1.tokenizer.replaceRange(
	            range.startIndex,
	            range.endOffset,
	            rangeTokens.reverse()
	        );
	    });
	}