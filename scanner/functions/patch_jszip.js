function patch_jszip(text) {
		// don't store in window
		// remove setImmediate delay, which causes zipping to be extremely slow
		text = text
			.replace(/^/, "var _fakeWindow={};\n")
			.replace(/\("undefined"!=typeof window.window:"undefined"!=typeof global.global:"undefined"!=typeof self.self:this\)/g, "(_fakeWindow)")
			.replace(/\("undefined"!=typeof window.window:void 0!==...:"undefined"!=typeof self\?self:this\)/g, "(_fakeWindow)")
			.replace(/if\(typeof window!=="undefined"\){g=window}/, 'if(typeof _fakeWindow!=="undefined"){g=_fakeWindow}')
			.replace(/(\.delay=function\(.,.,.\){)[a-zA-Z]+\(function\(\){(.*?)}\)(},)/, "$1$2$3")
			.replace(/typeof global !== "undefined" . global/, 'typeof _fakeWindow !== "undefined" ? _fakeWindow');

		return libexport_shim(text, "_fakeWindow.JSZip");
	}