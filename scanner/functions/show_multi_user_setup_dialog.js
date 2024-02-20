function show_multi_user_setup_dialog(from_current_document){
	const $w = $DialogWindow().title("Multi-User Setup").addClass("horizontal-buttons");
	$w.$main.html(`
		${from_current_document ? "<p>This will make the current document public.</p>" : ""}
		<p>
			<!-- Choose a name for the multi-user session, included in the URL for sharing: -->
			Enter the session name that will be used in the URL for sharing:
		</p>
		<p>
			<label>
				<span class="partial-url-label">jspaint.app/#session:</span>
				<input
					type="text"
					id="session-name"
					aria-label="session name"
					pattern="[-0-9A-Za-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u02af\\u1d00-\\u1d25\\u1d62-\\u1d65\\u1d6b-\\u1d77\\u1d79-\\u1d9a\\u1e00-\\u1eff\\u2090-\\u2094\\u2184-\\u2184\\u2488-\\u2490\\u271d-\\u271d\\u2c60-\\u2c7c\\u2c7e-\\u2c7f\\ua722-\\ua76f\\ua771-\\ua787\\ua78b-\\ua78c\\ua7fb-\\ua7ff\\ufb00-\\ufb06]+"
					title="Numbers, letters, and hyphens are allowed."
					class="inset-deep"
				>
			</label>
		</p>
	`);
	const $session_name = $w.$main.find("#session-name");
	$w.$main.css({maxWidth: "500px"});
	$w.$Button("Start", () => {
		let name = $session_name.val().trim();

		if(name == ""){
			show_error_message("The session name cannot be empty.");
		// }else if(name.match(/[./[\]#$]/)){
		// 	show_error_message("The session name cannot contain any of ./[]#$");
		// }else if(name.match(/\s/)){
		// 	show_error_message("The session name cannot contain spaces.");
		}else if($session_name.is(":invalid")){
			show_error_message("The session name must be made from only numbers, letters, and hyphens.");
		}else{
			if (from_current_document) {
				change_url_param("session", name);
			} else {
				// @TODO: load new empty session in the same browser tab
				// (or at least... keep settings like vertical-color-box-mode?)
				window.open(`${location.origin}${location.pathname}#session:${name}`);
			}
			$w.close();
		}
	});
	$w.$Button(localize("Cancel"), () => {
		$w.close();
	});
	$w.center();
	$session_name.focus();
}