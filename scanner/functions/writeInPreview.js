function writeInPreview(data) {
				if (options.previewInElement) {
					$(options.previewInElement).html(data);
				} else if (previewWindow && previewWindow.document) {			
					try {
						sp = previewWindow.document.documentElement.scrollTop
					} catch(e) {
						sp = 0;
					}	
					previewWindow.document.open();
					previewWindow.document.write(data);
					previewWindow.document.close();
					previewWindow.document.documentElement.scrollTop = sp;
				}
			}