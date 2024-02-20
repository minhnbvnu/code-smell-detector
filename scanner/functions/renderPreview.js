function renderPreview() {
				var phtml;
				var parsedData = $$.val();
				if (options.previewParser && typeof options.previewParser === 'function') {
					parsedData = options.previewParser(parsedData); 
				}
				if (options.previewHandler && typeof options.previewHandler === 'function') {
					options.previewHandler(parsedData);
				} else if (options.previewParserPath !== '') {
					$.ajax({
						type: options.previewParserAjaxType,
						dataType: 'text',
						global: false,
						url: options.previewParserPath,
						data: options.previewParserVar+'='+encodeURIComponent(parsedData),
						success: function(data) {
							writeInPreview( localize(data, 1) ); 
						}
					});
				} else {
					if (!template) {
						$.ajax({
							url: options.previewTemplatePath,
							dataType: 'text',
							global: false,
							success: function(data) {
								writeInPreview( localize(data, 1).replace(/<!-- content -->/g, parsedData) );
							}
						});
					}
				}
				return false;
			}