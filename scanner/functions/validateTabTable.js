function validateTabTable($, title, opts) {
	opts = opts || {};

	validateUiComponent($, title + 'Tab', {
		api: 'Ti.UI.Tab',
		style: {
			title: title,
			id: title + 'Tab'
		}
	});

	validateUiComponent($, title + 'Window', {
		api: 'Ti.UI.Window',
		style: {
			backgroundColor: '#fff',
			title: opts.windowTitle || title,
			id: title + 'Window'
		}
	});

	if (!opts.skipTable) {
		validateUiComponent($, title + 'Table', {
			api: 'Ti.UI.TableView',
			style: {
				id: title + 'Table'
			}
		});
	}
}