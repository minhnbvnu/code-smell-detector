function getRendererInstance(filename) {
                if (isMarkdownFile(filename)) {
                	return new MarkdownRenderer();
				}
                if (isCodeMirrorFile(filename)) {
                	return new CodeMirrorRenderer();
				}
			}