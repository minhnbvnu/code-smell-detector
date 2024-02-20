function apply_styles(el, str, options) {
			var style_blocks = parse_styles(str, true);
			if (!style_blocks)
				return;
			// currently unused because revert_styles isn't used anywhere
			if (options.allow_revert) {
				var oldstyle = el.getAttribute("style"); // this can be expensive for `all: initial` styles
				if (oldstyle) {
					el.setAttribute("data-imu-oldstyle", oldstyle);
				}
			}
			var styles = {};
			if ("default" in style_blocks)
				styles = style_blocks["default"];
			if (options.id && ("#" + options.id) in style_blocks) {
				var block = style_blocks["#" + options.id];
				for (var property in block) {
					if (!(property in styles))
						styles[property] = [];
					array_extend(styles[property], block[property]);
				}
			}
			// avoid modifying the source object if format_string adds new variables
			var format_vars = shallowcopy(options.format_vars);
			var iter = function(property, obj) {
				var value = obj.value;
				// todo: maybe handle escape sequences with JSON_parse?
				if (value.match(/^['"].*['"]$/)) {
					value = value.replace(/^["'](.*)["']$/, "$1");
				}
				if (options.old_variables) {
					for (var variable in options.old_variables) {
						value = string_replaceall(value, variable, options.old_variables[variable]);
					}
				}
				if (options.format_vars) {
					var formatted = format_string_single(value, format_vars);
					if (!formatted)
						return;
					value = formatted;
				}
				if (options.properties) {
					if (property in options.properties) {
						options.properties[property](value, property);
					}
				}
				if (obj.important || options.force_important) {
					el.style.setProperty(property, value, "important");
				} else {
					el.style.setProperty(property, value);
				}
				el.setAttribute("data-imu-newstyle", true);
			};
			for (var property in styles) {
				array_foreach(styles[property], function(obj) {
					iter(property, obj);
				});
			}
		}