function handle_pointerup_blur() {
			$marquee.hide();
			dragging = false;
			set_dragging_file_paths([]);
			$($folder_view[0].ownerDocument).off("pointermove", handle_pointermove);
			$($folder_view[0].ownerDocument).off("pointerup blur", handle_pointerup_blur);
		}