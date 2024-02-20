function do_redirect() {
		if (!settings.redirect_host_html && !currenttab_is_image()) {
			return;
		}
		cursor_wait();
		var force_page = false;
		if ((settings["redirect_force_page"] + "") === "true")
			force_page = true;
		do_redirect_sub(window.location.href, force_page, redirect);
	}