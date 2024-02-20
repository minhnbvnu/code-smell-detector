function Hinting(font) {
	    // the font this hinting object is for
	    this.font = font;

	    this.getCommands = function (hPoints) {
	        return glyf.getPath(hPoints).commands;
	    };

	    // cached states
	    this._fpgmState  =
	    this._prepState  =
	        undefined;

	    // errorState
	    // 0 ... all okay
	    // 1 ... had an error in a glyf,
	    //       continue working but stop spamming
	    //       the console
	    // 2 ... error at prep, stop hinting at this ppem
	    // 3 ... error at fpeg, stop hinting for this font at all
	    this._errorState = 0;
	}