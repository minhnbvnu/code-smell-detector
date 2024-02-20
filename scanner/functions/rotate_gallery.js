function rotate_gallery(dir) {
			if (!popups_active)
				return;
			var transforms = get_popup_transforms();
			var rotation_data = get_rotation_data_from_transforms(transforms);
			transforms.transforms[rotation_data.index] = "rotate(" + (rotation_data.deg + dir) + "deg)";
			set_popup_transforms(transforms);
			popup_createui_func(true);
		}