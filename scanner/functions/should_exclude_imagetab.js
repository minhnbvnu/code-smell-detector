function should_exclude_imagetab() {
			return settings.mouseover_exclude_imagetab && get_single_setting("mouseover_trigger_behavior") === "mouse" &&
				currenttab_is_image() && !imagetab_ok_override;
		}