function add_link_to_history(link) {
			if (is_extension) {
				extension_send_message({
					type: "add_to_history",
					data: {
						url: link
					}
				});
			}
		}