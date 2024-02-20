function createLanding() {
		//IE: add a "word joiner" character instead of a <br>
		var landing = Browser.ie
		            ? '<p class="aloha-editing-p aloha-placeholder">&#x2060;</p>'
		            : '<p class="aloha-editing-p aloha-placeholder"><br class="aloha-end-br"></p>';
		return jQuery(landing);
	}