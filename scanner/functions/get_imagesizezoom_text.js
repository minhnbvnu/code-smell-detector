function get_imagesizezoom_text() {
						var text = "";
						var rect_height = get_img_disp_height();
						var zoom_percent = rect_height / img_naturalHeight;
						var currentzoom = parse_int(zoom_percent * 100);
						var filesize = 0;
						if (newobj && newobj.filesize)
							filesize = newobj.filesize;
						var format = "";
						var formatorder = [
							{
								value: img_naturalWidth + "x" + img_naturalHeight,
								valid: settings.mouseover_ui_imagesize,
							},
							{
								value: currentzoom + "%",
								valid_paren: currentzoom !== 100 ? true : false,
								valid: settings.mouseover_ui_zoomlevel
							},
							{
								value: size_to_text(filesize),
								valid: settings.mouseover_ui_filesize && filesize
							}
						];
						var entries = [];
						for (var i = 0; i < formatorder.length; i++) {
							var our_format = formatorder[i];
							if (!our_format.valid)
								continue;
							if (entries.length > 0 && our_format.valid_paren === false)
								continue;
							entries.push(our_format.value);
						}
						if (entries.length === 0)
							return "";
						text = entries[0];
						if (entries.length > 1) {
							text += " (" + entries.slice(1).join(", ") + ")";
						}
						return text;
					}