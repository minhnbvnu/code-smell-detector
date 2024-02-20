function makeDialogProps(props, defaultTitle) {
		// All root elements of widgets added to the page by aloha should have the class 'aloha'.
		// All ui elements should have the class aloha-ui.
		// aloha-dialog is used for a hack to prevent a click in the
		// dialog from bluggin the editable search for aloha-dialog in
		// the aloha core for more information.
		var cls = 'aloha aloha-dialog aloha-ui';
		if (props.cls) {
			cls += ' ' + props.cls;
		}
		return {
			'resizable': false,
			'modal': true,
			'title': props.title || defaultTitle,
			'dialogClass': cls,
			'zIndex': 10200
		};
	}