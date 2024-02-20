function show_saved_message(meta) {
			set_saved_text(get_default_saved_text(meta));
			saved_el.setAttribute("style", "");
			saved_el.classList.remove("fadeout");
			if (saved_timeout)
				clearTimeout(saved_timeout);
			saved_timeout = setTimeout(function() {
				saved_el.classList.add("fadeout");
			}, 2000);
		}