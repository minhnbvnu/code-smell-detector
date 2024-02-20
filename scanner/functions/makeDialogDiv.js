function makeDialogDiv(props) {
		var textOrHtml = {};
		if (props.text) {
			textOrHtml.text = props.text;
		}
		if (props.html) {
			textOrHtml.html = props.html;
		}
		return $('<div>', textOrHtml);
	}