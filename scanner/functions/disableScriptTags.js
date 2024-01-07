function disableScriptTags() {
	  window.removeEventListener('DOMContentLoaded', transformScriptTags);
	}