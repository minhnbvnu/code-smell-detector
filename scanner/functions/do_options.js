function do_options() {
		update_dark_mode();
		var recording_keys = false;
		var options_chord = [];
		var current_options_chord = [];
		function update_options_chord(event, value) {
			if (!recording_keys)
				return;
			var map = get_keystrs_map(event, value);
			if ((keycode_to_str(event) || event.type === "mousedown") &&
				current_options_chord.length === 0) {
				// Don't clear the options chord for either left or right mouse buttons
				if (event.button !== 0 && event.button !== 2)
					options_chord = [];
			}
			var old_options_chord = deepcopy(options_chord);
			for (var key in map) {
				update_options_chord_sub(key, map[key]);
			}
			if (keysequence_bad(options_chord))
				options_chord = old_options_chord;
			recording_keys();
		}
		function update_options_chord_sub(str, value) {
			if (value) {
				if (array_indexof(options_chord, str) < 0) {
					options_chord.push(str);
				}
				if (array_indexof(current_options_chord, str) < 0) {
					current_options_chord.push(str);
				}
			} else {
				if (array_indexof(current_options_chord, str) >= 0) {
					current_options_chord.splice(array_indexof(current_options_chord, str), 1);
				}
			}
		}
		document.addEventListener('keydown', function(event) {
			update_options_chord(event, true);
			if (recording_keys) {
				event.preventDefault();
				return false;
			}
		});
		document.addEventListener('mousedown', function(event) {
			update_options_chord(event, true);
			if (recording_keys) {
				event.preventDefault();
				//event.stopImmediatePropagation();
				return false;
			}
		});
		document.addEventListener('wheel', function(event) {
			update_options_chord(event, true);
			if (recording_keys) {
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();
				return false;
			}
		}, {
			capture: true,
			passive: false
		});
		document.addEventListener("contextmenu", function(event) {
			if (recording_keys) {
				event.preventDefault();
				event.stopImmediatePropagation();
				return false;
			}
		});
		document.addEventListener('keyup', function(event) {
			update_options_chord(event, false);
			if (recording_keys) {
				event.preventDefault();
				return false;
			}
		});
		document.addEventListener('mouseup', function(event) {
			if (event.button === 1)
				return;
			update_options_chord(event, false);
			if (recording_keys) {
				event.preventDefault();
				event.stopImmediatePropagation();
				return false;
			}
		});
		var options_el_real = document.getElementById("options");
		options_el_real.textContent = "";
		var options_el = document.createDocumentFragment();
		if (!is_extension_options_page) {
			var options_header_el = document_createElement("h1");
			options_header_el.textContent = _("options_header");
			options_el.appendChild(options_header_el);
		}
		var saved_el = document.getElementById("saved");
		if (!saved_el) {
			saved_el = document_createElement("div");
			saved_el.style.visibility = "hidden";
			saved_el.id = "saved";
			saved_el.classList.add("topsaved");
		}
		var get_default_saved_text = function(meta) {
			var text = "Saved! Refresh the target page for changes to take effect";
			if (meta && meta.needrefresh)
				return text;
			if (is_extension || typeof GM_addValueChangeListener !== "undefined") {
				text = "Saved!";
			}
			return text;
		};
		var set_saved_text = function(id) {
			var p_el = document_createElement("p");
			p_el.textContent = _(id);
			saved_el.textContent = "";
			saved_el.appendChild(p_el);
		};
		set_saved_text(get_default_saved_text());
		//saved_el.style.pointer_events = "none";
		//saved_el.style.textAlign = "center";
		//saved_el.style.paddingTop = "1em";
		//saved_el.style.fontStyle = "italic";
		//saved_el.style.color = "#0af";
		var saved_timeout = null;
		var create_update_available = function() {
			var update_available_el = document_createElement("div");
			update_available_el.classList.add("update-available");
			update_available_el.innerHTML = "Update available: v" + current_version + " -&gt; ";
			var link = get_update_url();
			if (link) {
				update_available_el.innerHTML += "<a href=\"" + link + "\" target=\"_blank\" rel=\"noreferer\">v" + settings.last_update_version + "</a>";
			} else {
				update_available_el.innerHTML += "v" + settings.last_update_version;
			}
			return update_available_el;
		};
		if (settings.check_updates && version_compare(current_version, settings.last_update_version) === 1) {
			options_el.appendChild(create_update_available());
		}
		var rules_failed_el = document.createElement("p");
		if (set_require_rules_failed_el(rules_failed_el)) {
			options_el.appendChild(rules_failed_el);
		}
		var topbtns_holder = document_createElement("div");
		topbtns_holder.id = "topbtns";
		options_el.appendChild(topbtns_holder);
		var importexport_ocontainer = document_createElement("div");
		importexport_ocontainer.id = "importexport";
		importexport_ocontainer.classList.add("center-outer");
		importexport_ocontainer.style.display = "none";
		options_el.appendChild(importexport_ocontainer);
		var importexport_container = document_createElement("div");
		importexport_container.classList.add("center-inner");
		importexport_ocontainer.appendChild(importexport_container);
		var importexport_text = document_createElement("textarea");
		importexport_container.appendChild(importexport_text);
		var safe_import_json = function(json) {
			json = strip_whitespace_simple(json);
			var append = false;
			if (json[0] === "+") {
				append = true;
				json = json.substring(1);
			}
			var value = null;
			try {
				value = JSON_parse(json);
			} catch (e) {
				console_error(e);
			}
			return {
				value: value,
				append: append
			};
		};
		var fetch_import_json = function(import_text, cb) {
			if (/^https?:\/\//.test(import_text)) {
				do_request({
					method: "GET",
					url: import_text,
					onload: function(resp) {
						if (resp.status !== 200) {
							console.error(resp);
							return cb(null);
						}
						cb(safe_import_json(resp.responseText));
					}
				});
			} else {
				cb(safe_import_json(import_text));
			}
		};
		var real_import_btn = document_createElement("button");
		real_import_btn.innerText = _("Import");
		real_import_btn.onclick = function() {
			if (real_import_btn.classList.contains("disabled"))
				return;
			real_import_btn.classList.add("disabled");
			var import_text = importexport_text.value;
			import_text = strip_whitespace_simple(import_text);
			fetch_import_json(import_text, function(data) {
				if (!data || !data.value) {
					importexport_text.value = "Error!";
					real_import_btn.classList.remove("disabled");
					return;
				}
				var value = data.value;
				var append = data.append;
				var changed = false;
				var current_settings = deepcopy(settings);
				var new_settings;
				if (!append)
					new_settings = deepcopy(orig_settings);
				else
					new_settings = deepcopy(settings);
				var settings_version;
				for (var key in value) {
					if (!(key in settings)) {
						if (key === "settings_version") {
							settings_version = value[key];
							continue;
						} else {
							console_warn("Unknown key in imported settings:", key);
						}
					}
					new_settings[key] = value[key];
				}
				for (var key in new_settings) {
					if (JSON_stringify(new_settings[key]) !== JSON_stringify(current_settings[key])) {
						settings[key] = new_settings[key];
						set_value(key, new_settings[key]);
						changed = true;
					}
				}
				if (settings_version === void 0) {
					settings_version = 1;
				}
				upgrade_settings_with_version(settings_version, new_settings, function(new_changed) {
					real_import_btn.classList.remove("disabled");
					if (changed || new_changed) {
						console_log("Settings imported");
						setTimeout(function() {
							do_options();
						}, 1);
					} else {
						console_log("No settings changed");
					}
					show_importexport(false);
				});
			});
		};
		importexport_container.appendChild(real_import_btn);
		var export_container = document_createElement("div");
		var export_txt_btn = document_createElement("button");
		export_txt_btn.innerText = _("Save");
		export_txt_btn.onclick = function() {
			var data = importexport_text.value;
			var url = "data:text/plain," + encodeURIComponent(data);
			var obj = {
				url: url,
				filename: "settings.txt"
			};
			do_download(obj, obj.filename, data.length);
		};
		export_container.appendChild(export_txt_btn);
		importexport_container.appendChild(export_container);
		var show_importexport = function(show, importexport) {
			if (show) {
				importexport_ocontainer.style.display = "block";
			} else {
				importexport_state = null;
				importexport_ocontainer.style.display = "none";
			}
			if (importexport) {
				if (show)
					importexport_state = "import";
				real_import_btn.style.display = "inline-block";
				export_container.style.display = "none";
			} else {
				if (show)
					importexport_state = "export";
				real_import_btn.style.display = "none";
				export_container.style.display = "block";
			}
		};
		var importexport_state = null;
		var import_btn = document_createElement("button");
		import_btn.id = "importbtn";
		import_btn.innerText = _("Import");
		import_btn.title = _("Import settings");
		import_btn.onclick = function() {
			if (importexport_state === "import")
				return show_importexport(false);
			importexport_text.value = "";
			show_importexport(true, true);
		};
		topbtns_holder.appendChild(import_btn);
		var export_btn = document_createElement("button");
		export_btn.id = "exportbtn";
		export_btn.innerText = _("Export");
		export_btn.title = _("Export settings");
		export_btn.onclick = function() {
			if (importexport_state === "export")
				return show_importexport(false);
			var newsettings = deepcopy(settings);
			get_value("settings_version", function(value) {
				if (value !== void 0)
					newsettings.settings_version = value;
				importexport_text.value = JSON_stringify(newsettings);
				show_importexport(true, false);
			});
		};
		topbtns_holder.appendChild(export_btn);
		var enabled_map = {};
		var reason_map = {};
		var check_sub_option = function(meta, reason) {
			if (typeof reason === "undefined") {
				reason = {};
			}
			var enabled = true;
			var prepare_array = function(value) {
				var result = deepcopy(value);
				if (!result) {
					return null;
				}
				if (typeof result === "string") {
					result = deepcopy(settings_conditions[result]);
				}
				if (!is_array(result)) {
					result = [result];
				}
				var newresult = [];
				array_foreach(result, function(single) {
					if (single._condition) {
						var cond = deepcopy(settings_conditions[single._condition]);
						if (!is_array(cond))
							cond = [cond];
						array_foreach(cond, function(scond) {
							obj_foreach(single, function(key, value) {
								if (key === "_condition")
									return;
								scond[key] = value;
							});
							newresult.push(scond);
						});
					} else {
						newresult.push(single);
					}
				});
				// add profiled keys, e.g.
				// [{mouseover_open_behavior: "popup"}] -> [{"mouseover_open_behavior": "popup"}, {"mouseover_open_behavior_t2": "popup"}]
				result = [];
				array_foreach(newresult, function(single) {
					result.push(single);
					var profiled_keys = [];
					obj_foreach(single, function(key, value) {
						var meta = settings_meta[key];
						if (!meta)
							return;
						if (meta.profiled) {
							profiled_keys.push(key);
						}
					});
					if (profiled_keys.length) {
						for (var i = 0; i < num_profiles; i++) {
							var new_single = deepcopy(single);
							array_foreach(profiled_keys, function(key) {
								var profiled_key = "t" + (i + 2) + "_" + key;
								new_single[profiled_key] = new_single[key];
								delete new_single[key];
							});
							new_single._auto = true;
							result.push(new_single);
						}
					}
				});
				return result;
			};
			var requires = prepare_array(meta.requires);
			var disabled_if = prepare_array(meta.disabled_if);
			if (!meta.imu_enabled_exempt) {
				if (!settings.imu_enabled) {
					enabled = false;
				}
			}
			reason.good = [];
			reason.bad = [];
			if (enabled && requires) {
				enabled = check_validity(requires, reason);
				reason.good = [];
			}
			if (enabled && disabled_if) {
				reason.good = [];
				reason.bad = [];
				enabled = !check_validity(disabled_if, reason);
				reason.bad = [];
			}
			return enabled;
		};
		var check_option = function(setting) {
			var meta = settings_meta[setting];
			enabled_map[setting] = "processing";
			reason_map[setting] = {};
			var enabled = check_sub_option(meta, reason_map[setting]);
			enabled_map[setting] = enabled;
			return enabled;
		};
		var check_validity = function(array, reason) {
			for (var i = 0; i < array.length; i++) {
				var current = array[i];
				var current_valid = true;
				var good_reason, bad_reason;
				if (typeof reason !== "undefined") {
					good_reason = [];
					bad_reason = [];
				}
				for (var required_setting in current) {
					if (required_setting[0] === "_")
						continue;
					var required_value = current[required_setting];
					var value = settings[required_setting];
					if (is_array(value) && !is_array(required_value))
						value = value[0];
					if (!(required_setting in enabled_map)) {
						check_option(required_setting);
					}
					if (enabled_map[required_setting] === "processing") {
						console_error("Dependency cycle detected for:", current, ",", required_setting);
						return;
					}
					var current_reason = {
						setting: required_setting,
						required_value: required_value,
						current_value: value,
						enabled: enabled_map[required_setting],
						auto: !!current._auto
					};
					var value_is_required = value === required_value;
					if (!value_is_required && settings_meta[required_setting].type === "keysequence" && required_value === true) {
						// value can be undefined because value = value[0] above
						value_is_required = value && !!value.length;
					}
					if (enabled_map[required_setting] && value_is_required) {
						//current_valid = true;
						if (typeof good_reason !== "undefined") {
							good_reason.push(current_reason);
						}
					} else {
						current_valid = false;
						if (typeof bad_reason !== "undefined") {
							bad_reason.push(current_reason);
						}
					}
					if (!current_valid && typeof reason === "undefined") {
						break;
					}
				}
				if (typeof reason !== "undefined") {
					reason.good.push(good_reason);
					reason.bad.push(bad_reason);
				}
				if (current_valid) {
					return true;
				}
			}
			return false;
		};
		var get_option_from_options = function(options, option) {
			if (option in options)
				return options[option];
			for (var option_name in options) {
				if (/^_group/.test(option_name)) {
					return get_option_from_options(options[option_name], option);
				}
			}
			return null;
		};
		var is_nonempty_reason = function(goodbad) {
			for (var i = 0; i < goodbad.length; i++) {
				if (goodbad[i].length !== 0)
					return true;
			}
			return false;
		};
		var is_reason_goodbad = function(reason) {
			if (is_nonempty_reason(reason.good))
				return "good";
			if (is_nonempty_reason(reason.bad))
				return "bad";
			return null;
		};
		var fill_requirements = function(reason, div) {
			div.textContent = "";
			if (!settings.settings_show_requirements)
				return;
			var goodbad = is_reason_goodbad(reason);
			if (!goodbad)
				return;
			var requires_p = document_createElement("p");
			requires_p.innerText = _("Requires:");
			div.appendChild(requires_p);
			var els = [];
			var array = reason[goodbad];
			for (var i = 0; i < array.length; i++) {
				if (array[i].length === 0)
					continue;
				var ul = document_createElement("ul");
				var ul_valid = false;
				for (var j = 0; j < array[i].length; j++) {
					var single_reason = array[i][j];
					if (single_reason.auto)
						continue;
					var option_meta = null;
					var option_name = single_reason.setting;
					var option_cat = null;
					if (single_reason.setting in settings_meta) {
						option_meta = settings_meta[single_reason.setting];
						option_name = _(option_meta.name);
						option_cat = option_meta.category || null;
						if (option_cat) {
							option_cat = _(categories[option_cat]);
						}
					}
					var cat_prefix = "";
					// TODO: don't check label_texts, this doesn't work with tabs. Instead, do proper parsing
					//var wanted_value_el = document.querySelector("label[for=\"input_" + single_reason.setting + "_" + single_reason.required_value + "\"]");
					var wanted_value = single_reason.required_value;
					var input_id = "input_" + single_reason.setting + "_" + single_reason.required_value;
					if (input_id in label_texts) {
						wanted_value = label_texts[input_id];
					} else if (option_cat) { // FIXME: really hacky check to see if in same tab or not
						cat_prefix = "(" + option_cat + ") ";
					}
					var equals = "=";
					if (goodbad === "good")
						equals = "!=";
					var li = document_createElement("li");
					li.innerText = cat_prefix + option_name + " " + equals + " " + wanted_value;
					ul.appendChild(li);
					ul_valid = true;
				}
				if (ul_valid)
					els.push(ul);
			}
			var newels = [];
			for (var i = 0; i < els.length - 1; i++) {
				newels.push(els[i]);
				// FIXME: this should be 'and' for disabled_if
				var or_p = document_createElement("p");
				or_p.innerText = _("Or:");
				newels.push(or_p);
			}
			newels.push(els[els.length - 1]);
			for (var i = 0; i < newels.length; i++) {
				div.appendChild(newels[i]);
			}
		};
		function check_disabled_options() {
			var options = options_el.querySelectorAll("div.option");
			enabled_map = {};
			for (var i = 0; i < options.length; i++) {
				var setting = options[i].id.replace(/^option_/, "");
				var enabled = check_option(setting);
				if (enabled) {
					options[i].classList.remove("disabled");
					options[i].classList.remove("disabled-hidden");
					options[i].getElementsByClassName("requirements")[0].classList.add("hidden");
					var meta = settings_meta[setting];
					var meta_options = meta.options;
					var regexp = new RegExp("^input_" + setting + "_");
					var els = options[i].querySelectorAll("input, textarea, button, select, option");
					for (var j = 0; j < els.length; j++) {
						var input = els[j];
						input.disabled = false;
						if (meta_options) {
							var option_name = input.id.replace(regexp, "");
							if (option_name !== input.id) {
								var option_value = get_option_from_options(meta_options, option_name);
								if (option_value) {
									if (!check_sub_option(option_value)) {
										input.disabled = true;
									}
								}
							}
						}
					}
				} else {
					options[i].classList.add("disabled");
					if (!settings.settings_show_disabled) {
						options[i].classList.add("disabled-hidden");
					} else if (!settings.settings_show_disabled_profiles && /^t[0-9]+_/.test(setting)) {
						var trigger_value = settings["mouseover_trigger_key_" + setting.replace(/^(t[0-9]+)_.*/, "$1")];
						if (trigger_value.length <= 0) {
							options[i].classList.add("disabled-hidden");
						}
					}
					var els = options[i].querySelectorAll("input, textarea, button, select");
					for (var j = 0; j < els.length; j++) {
						var input = els[j];
						input.disabled = true;
					}
					var requirements_div = options[i].getElementsByClassName("requirements")[0];
					//requirements_div.style.display = "block";
					requirements_div.classList.remove("hidden");
					fill_requirements(reason_map[setting], requirements_div);
				}
			}
		}
		function show_warnings() {
			var options = options_el.querySelectorAll("div.option");
			for (var i = 0; i < options.length; i++) {
				var setting = options[i].id.replace(/^option_/, "");
				var meta = settings_meta[setting];
				if (meta.warning) {
					var warning = meta.warning[settings[setting] + ""];
					var el = options[i].querySelector(".warning");
					if (!el)
						continue;
					if (warning) {
						el.innerText = warning;
						el.style.display = "block";
					} else {
						el.style.display = "none";
					}
				}
			}
		}
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
		function md_to_html(parent, text) {
			var current_el = null;
			var current_text = "";
			var current_tag = null;
			var apply_tag = function() {
				if (current_text.length === 0)
					return;
				if (current_tag === "`") {
					current_el = document_createElement("code");
				} else {
					current_el = document_createElement("span");
				}
				current_el.innerText = current_text;
				current_text = "";
				parent.appendChild(current_el);
			};
			// fast path
			if (string_indexof(text, "`") < 0 && string_indexof(text, "\n") < 0) {
				current_text = text;
				apply_tag();
				return;
			}
			for (var i = 0; i < text.length; i++) {
				if (text[i] === current_tag) {
					apply_tag();
					current_tag = null;
					continue;
				}
				if (text[i] === "`") {
					apply_tag();
					current_tag = text[i];
					continue;
				}
				if (text[i] === "\n") {
					apply_tag();
					parent.appendChild(document_createElement("br"));
					continue;
				}
				current_text += text[i];
			}
			apply_tag();
		}
		var tabscontainer;
		if (settings.settings_tabs) {
			tabscontainer = document_createElement("div");
			tabscontainer.id = "tabs";
			options_el.appendChild(tabscontainer);
		}
		var category_els = {};
		var subcategory_els = {};
		if (!(current_options_tab in categories)) {
			current_options_tab = "general";
		}
		for (var category in categories) {
			var catname = _(categories[category]);
			var div = document_createElement("div");
			div.id = "cat_" + category;
			div.classList.add("category");
			category_els[category] = [div];
			if (settings.settings_tabs) {
				div.classList.add("tabbed");
				var tab = document_createElement("span");
				tab.classList.add("tab");
				//tab.href = "#cat_" + category;
				tab.id = "tab_cat_" + category;
				tab.innerText = catname;
				(function(category) {
					tab.onclick = function() {
						current_options_tab = category;
						window.location.hash = "cat_fake_" + category;
						do_options();
					};
				})(category);
				if (category === current_options_tab) {
					tab.classList.add("active");
				} else {
					div.style.display = "none";
				}
				category_els[category].push(tab);
				tabscontainer.appendChild(tab);
			} else {
				var h2 = document_createElement("h2");
				h2.innerText = catname;
				div.appendChild(h2);
			}
			var subdiv = document_createElement("div");
			subdiv.id = "subcat_" + category;
			subdiv.classList.add("subcat");
			subdiv.classList.add("frame");
			div.appendChild(subdiv);
			subcategory_els[category] = subdiv;
			if (category in subcategories) {
				for (var subcat in subcategories[category]) {
					var newsubdiv = document_createElement("div");
					var subcat_full = category + "_" + subcat;
					newsubdiv.id = "subcat_" + subcat_full;
					newsubdiv.classList.add("subcat");
					newsubdiv.classList.add("frame");
					var h3 = document_createElement("h3");
					h3.innerText = _(subcategories[category][subcat]);
					newsubdiv.appendChild(h3);
					div.appendChild(newsubdiv);
					subcategory_els[subcat_full] = newsubdiv;
				}
			}
			options_el.appendChild(div);
		}
		var show_advanced = settings.advanced_options;
		var normalize_value = function(value) {
			if (is_array(value) && value.length === 1) {
				return JSON_stringify(value[0]);
			}
			return JSON_stringify(value);
		};
		var category_settings = {};
		var label_texts = {};
		var add_setting_dom = function(setting) {
			var meta = settings_meta[setting];
			if (!meta) {
				return;
			}
			if (!(setting in orig_settings))
				return;
			var value = settings[setting];
			var orig_value = orig_settings[setting];
			if (meta.hidden)
				return;
			if (meta.userscript_only && !is_userscript)
				return;
			if (meta.extension_only && !is_extension)
				return;
			if (meta.advanced && !show_advanced)
				return;
			category_settings[meta.category] = true;
			if (settings.settings_tabs && meta.category !== current_options_tab)
				return;
			var option = document_createElement("div");
			option.classList.add("option");
			option.id = "option_" + setting;
			if (/^t[0-9]+_/.test(setting) || /_t[0-9]+$/.test(setting)) {
				option.classList.add("trigger_profile");
			}
			var table = document_createElement("table");
			table.classList.add("option-table");
			var tr = document_createElement("tr");
			table.appendChild(tr);
			var name = document_createElement("strong");
			md_to_html(name, _(meta.name));
			var description = _(meta.description);
			if (meta.description_userscript && is_userscript)
				description = _(meta.description_userscript);
			if (description) {
				name.title = description;
			} else {
				name.classList.add("no-title");
			}
			var name_td = document_createElement("td");
			name_td.classList.add("name_td");
			name_td.classList.add("name_td_va_middle");
			var revert_btn = document.createElement("button");
			// \u2b8c = ⮌
			revert_btn.innerText = "\u2b8c";
			revert_btn.classList.add("revert-button");
			revert_btn.title = _("Revert");
			revert_btn.onclick = function() {
				if (revert_btn.disabled)
					return;
				do_update_setting(setting, orig_value, meta);
				run_soon(do_options);
			};
			var check_value_orig_different = function(value) {
				var value_norm = normalize_value(value);
				var orig_norm = normalize_value(orig_value);
				if (meta.type === "keysequence") {
					value_norm = JSON_stringify(normalize_keychord(value));
					orig_norm = JSON_stringify(normalize_keychord(orig_value));
				}
				var value_orig_different = value_norm !== orig_norm;
				if (value_orig_different) {
					name_td.classList.add("value_modified");
					name_td.appendChild(revert_btn);
				} else {
					name_td.classList.remove("value_modified");
					if (revert_btn.parentElement === name_td)
						name_td.removeChild(revert_btn);
				}
			};
			var do_update_setting_real = function(setting, new_value, meta) {
				update_setting(setting, new_value);
				run_soon(function() {
					check_value_orig_different(new_value);
				});
				show_saved_message(meta);
			};
			var do_update_setting = function(setting, new_value, meta) {
				if (is_extension && meta.required_permission) {
					request_permission(meta.required_permission, function(granted) {
						if (granted) {
							do_update_setting_real(setting, new_value, meta);
						} else {
							do_options();
						}
					});
				} else {
					do_update_setting_real(setting, new_value, meta);
				}
			};
			name_td.appendChild(name);
			check_value_orig_different(value);
			tr.appendChild(name_td);
			var value_td = document_createElement("td");
			value_td.classList.add("value_td");
			var type = "options";
			var option_list = {};
			if (typeof orig_value === "boolean") {
				type = "options";
				option_list["true"] = { name: _("yes") };
				option_list["false"] = { name: _("no") };
				if (value)
					option_list["true"].checked = true;
				else
					option_list["false"].checked = true;
			} else if (meta.options) {
				if (meta.options._randomize) {
					var keys = Object.keys(meta.options);
					var new_options = {};
					// prepend options that do need to be properly sorted
					for (var option_name in meta.options) {
						if (option_name[0] == "_" || meta.options[option_name].is_null) {
							new_options[option_name] = meta.options[option_name];
						}
					}
					keys.sort(function() {
						return (Math_floor(Math_random() * 2) ? 1 : -1);
					});
					for (var i = 0; i < keys.length; i++) {
						if (keys[i] in new_options)
							continue;
						new_options[keys[i]] = meta.options[keys[i]];
					}
					meta.options = new_options;
				}
				if (meta.options._type === "combo") {
					type = "combo";
				} else {
					type = "options";
					option_list = deepcopy(meta.options);
					var check_optionlist = function(val, list) {
						if (val in list) {
							list[val].checked = true;
						} else {
							for (var item in list) {
								if (item.match(/^_group/)) {
									check_optionlist(val, list[item]);
								}
							}
						}
					};
					if (is_array(value)) {
						array_foreach(value, function(val) {
							check_optionlist(val, option_list);
						});
					} else {
						check_optionlist(value, option_list);
					}
				}
			} else if (meta.type) {
				if (meta.type === "textarea" ||
					meta.type === "keysequence" ||
					meta.type === "number" ||
					meta.type === "lineedit")
					type = meta.type;
			}
			if (type === "options") {
				var option_type = option_list._type;
				if (!option_type)
					option_type = "or";
				var add_setting = function(parent, op, val, option_type, group, group_type) {
					var id = "input_" + setting + "_" + op;
					var name = setting;
					if (group && group_type === "and")
						name += "_" + group;
					var input = document_createElement("input");
					if (option_type === "or" && false)
						input.setAttribute("type", "radio");
					else if (option_type === "and" || true)
						input.setAttribute("type", "checkbox");
					input.name = name;
					input.value = op;
					input.id = id;
					if (val.checked)
						input.setAttribute("checked", "true");
					input.addEventListener("change", function(event) {
						var value = this.value;
						if (value === "true") {
							value = true;
						}
						if (value === "false")
							value = false;
						if (this.checked) {
							if (group && group_type === "or") {
								for (var child_i = 0; child_i < value_td.children.length; child_i++) {
									var child = value_td.children[child_i];
									if (child.id !== (setting + group)) {
										for (var subchild_i = 0; subchild_i < child.children.length; subchild_i++) {
											var subchild = child.children[subchild_i];
											if (subchild.tagName === "INPUT") {
												subchild.checked = false;
											}
										}
									}
								}
							}
							if (option_type === "or") {
								for (var child_i = 0; child_i < parent.children.length; child_i++) {
									var child = parent.children[child_i];
									if (child.tagName === "INPUT" && child.id != input.id) {
										child.checked = false;
									}
								}
							}
						} else {
							var onechecked = false;
							for (var child_i = 0; child_i < value_td.children.length; child_i++) {
								var child = value_td.children[child_i];
								for (var subchild_i = 0; subchild_i < child.children.length; subchild_i++) {
									var subchild = child.children[subchild_i];
									if (subchild.tagName === "INPUT") {
										if (subchild.checked) {
											onechecked = true;
											break;
										}
									}
								}
								if (onechecked)
									break;
							}
							if (!onechecked) {
								this.checked = true;
							}
						}
						var new_value = value;
						if (group || option_type !== "or") {
							var out_value = [];
							var inputs = value_td.getElementsByTagName("input");
							for (var child_i = 0; child_i < inputs.length; child_i++) {
								var child = inputs[child_i];
								if (child.checked) {
									out_value.push(child.value);
								}
							}
							new_value = out_value;
							do_update_setting(setting, new_value, meta);
						} else {
							do_update_setting(setting, value, meta);
						}
						//settings[setting] = new_value;
						check_disabled_options();
						show_warnings();
					});
					parent.appendChild(input);
					var label = document_createElement("label");
					label.setAttribute("for", id);
					label_texts[id] = _(val.name);
					if (label_texts[id]) {
						label.innerText = label_texts[id];
					} else {
						label.innerHTML = "&nbsp;";
					}
					if (val.description) {
						label.title = _(val.description);
					}
					parent.appendChild(label);
				};
				for (var op in option_list) {
					if (option_list[op].extension_only && !is_extension)
						continue;
					if (op.match(/^_group/)) {
						var option_type1 = option_list[op]._type;
						if (!option_type1)
							option_type1 = "or";
						var sub = document_createElement("div");
						sub.classList.add("group");
						sub.id = setting + op;
						for (var op1 in option_list[op]) {
							if (!op1.match(/^_/))
								add_setting(sub, op1, option_list[op][op1], option_type1, op, option_type);
						}
						value_td.appendChild(sub);
					} else if (!op.match(/^_/)) {
						add_setting(value_td, op, option_list[op], option_type);
					}
				}
			} else if (type === "textarea") {
				var sub = document_createElement("table");
				var sub_tr = document_createElement("tr");
				var sub_ta_td = document_createElement("td");
				sub_ta_td.style.verticalAlign = "middle";
				//sub_ta_td.style.height = "1px";
				var sub_button_tr = document_createElement("tr");
				var sub_button_td = document_createElement("td");
				sub_button_td.style.textAlign = "center";
				//sub_button_td.style.verticalAlign = "middle";
				//sub_button_td.style.height = "1px";
				var textarea = document_createElement("textarea");
				textarea.style.height = "5em";
				textarea.style.width = "20em";
				if (value)
					textarea.value = value;
				var savebutton = document_createElement("button");
				savebutton.innerText = _("save");
				savebutton.onclick = function() {
					do_update_setting(setting, textarea.value, meta);
					// Background CSS style unlocks Background fade
					check_disabled_options();
					//settings[setting] = textarea.value;
				};
				sub_ta_td.appendChild(textarea);
				sub_button_td.appendChild(savebutton);
				sub_button_tr.appendChild(sub_button_td);
				sub_tr.appendChild(sub_ta_td);
				sub.appendChild(sub_tr);
				sub.appendChild(sub_button_tr);
				value_td.appendChild(sub);
			} else if (type === "number" || type === "lineedit") {
				var sub = document_createElement("table");
				var sub_tr = document_createElement("tr");
				var sub_in_td = document_createElement("td");
				sub_in_td.style = "display:inline";
				var input = document_createElement("input");
				if (false && type === "number") {
					// doesn't work properly on Waterfox, most of the functionality is implemented here anyways
					// thanks to decembre on github for reporting: https://github.com/qsniyg/maxurl/issues/14#issuecomment-531080061
					input.type = "number";
				} else {
					input.type = "text";
				}
				input.setAttribute("spellcheck", false);
				if (type === "number") {
					input.style = "text-align:right";
					if (meta.number_max !== void 0)
						input.setAttribute("max", meta.number_max.toString());
					if (meta.number_min !== void 0)
						input.setAttribute("min", meta.number_min.toString());
					if (meta.number_int)
						input.setAttribute("step", "1");
				}
				if (value !== void 0)
					input.value = value;
				input.oninput = input.onblur = function(e) {
					var need_correct = false;
					var do_update = true;
					if (e.type === "blur") {
						need_correct = true;
						do_update = false;
					}
					var value = input.value.toString();
					if (type === "number") {
						value = parseFloat(value);
						var orig_value = value;
						if (isNaN(value)) {
							if (!need_correct)
								return;
							value = 0;
						}
						if (meta.number_int) {
							value = parseInt(value);
						}
						if (meta.number_max !== void 0)
							value = Math_min(value, meta.number_max);
						if (meta.number_min !== void 0)
							value = Math_max(value, meta.number_min);
						if (isNaN(value)) {
							console_error("Error: number is NaN after min/max");
							return;
						}
						if (meta.number_int || value !== orig_value)
							input.value = value;
						value = parseFloat(value);
						if (e.type === "blur" && value !== orig_value) {
							do_update = true;
						}
					}
					if (do_update)
						do_update_setting(setting, value, meta);
				};
				var sub_units_td = document_createElement("td");
				//sub_units_td.style = "display:inline";
				sub_units_td.classList.add("number_units");
				if (meta.number_unit)
					sub_units_td.innerText = _(meta.number_unit);
				sub_tr.appendChild(input);
				sub_tr.appendChild(sub_units_td);
				sub.appendChild(sub_tr);
				value_td.appendChild(sub);
			} else if (type === "keysequence") {
				var sub = document_createElement("table");
				var values = deepcopy(value);
				if (values.length > 0 && !is_array(values[0]))
					values = [values];
				var indices = [];
				for (var i = 0; i < values.length; i++) {
					indices.push(i);
				}
				var is_only_keyseq = function() {
					var active_indices = 0;
					for (var i = 0; i < indices.length; i++) {
						if (indices[i] >= 0)
							active_indices++;
					}
					return active_indices < 2;
				};
				var update_keyseq_setting = function() {
					var result = [];
					for (var i = 0; i < indices.length; i++) {
						if (indices[i] >= 0 && values[i].length > 0) {
							result.push(values[i]);
						}
					}
					do_update_setting(setting, result, meta);
					check_disabled_options();
				};
				var recalculate_removebtns = function() {
					var do_remove = !meta.keyseq_allow_none && is_only_keyseq();
					for (var i = 0; i < sub.children.length; i++) {
						var child = sub.children[i];
						var removebtns = child.getElementsByClassName("removebtn");
						if (removebtns.length > 0) {
							if (do_remove) {
								removebtns[0].style.display = "none";
							} else {
								removebtns[0].style.display = "initial";
							}
						}
					}
				};
				var add_keyseq_tr = function(index, start_recording) {
					var sub_tr = document_createElement("tr");
					sub_tr.classList.add("keyseq");
					var sub_key_td = document_createElement("td");
					//sub_key_td.style = "display:inline;font-family:monospace";
					sub_key_td.classList.add("record_keybinding");
					if (value) {
						sub_key_td.innerText = get_trigger_key_texts(values)[index];
					}
					var sub_record_td = document_createElement("td");
					sub_record_td.style = "display:inline";
					var sub_record_btn = document_createElement("button");
					sub_record_btn.innerText = _("Record");
					var do_record = function() {
						if (recording_keys) {
							if (keysequence_valid(options_chord)) {
								values[index] = options_chord;
								update_keyseq_setting();
								//do_update_setting(setting, options_chord, meta);
								//settings[setting] = options_chord;
								do_cancel();
							}
						} else {
							options_chord = [];
							current_options_chord = [];
							recording_keys = function() {
								var our_chord = options_chord;
								if (our_chord.length === 0)
									our_chord = values[index];
								sub_key_td.innerText = get_trigger_key_texts(our_chord);
								if (keysequence_valid(options_chord)) {
									sub_record_btn.classList.remove("disabled");
								} else {
									sub_record_btn.classList.add("disabled");
								}
							};
							sub_record_btn.innerText = _("save");
							sub_cancel_btn.style = "display:inline-block";
						}
					};
					sub_record_btn.onmousedown = do_record;
					var sub_cancel_btn = document_createElement("button");
					sub_cancel_btn.innerText = _("Cancel");
					sub_cancel_btn.style = "display:none";
					var do_cancel = function() {
						recording_keys = false;
						sub_record_btn.innerText = _("Record");
						sub_record_btn.classList.remove("disabled");
						sub_cancel_btn.style = "display:none";
						sub_key_td.innerText = get_trigger_key_texts(values)[index];
					};
					sub_cancel_btn.onmousedown = do_cancel;
					var sub_remove_btn = document_createElement("button");
					//sub_remove_btn.innerText = "—";
					sub_remove_btn.innerText = "\xD7";
					sub_remove_btn.title = _("Remove");
					sub_remove_btn.classList.add("removebtn");
					sub_remove_btn.classList.add("small");
					if (!meta.keyseq_allow_none && is_only_keyseq()) {
						sub_remove_btn.style = "display:none";
					}
					sub_remove_btn.onclick = function() {
						if (!meta.keyseq_allow_none && is_only_keyseq())
							return;
						recording_keys = false;
						indices[index] = -1;
						for (var i = index + 1; i < indices.length; i++) {
							indices[i]--;
						}
						sub_tr.parentElement.removeChild(sub_tr);
						recalculate_removebtns();
						update_keyseq_setting();
					};
					sub_tr.appendChild(sub_key_td);
					sub_record_td.appendChild(sub_record_btn);
					sub_record_td.appendChild(sub_cancel_btn);
					sub_record_td.appendChild(sub_remove_btn);
					sub_tr.appendChild(sub_record_td);
					if (start_recording)
						do_record();
					return sub_tr;
				};
				for (var i = 0; i < indices.length; i++) {
					sub.appendChild(add_keyseq_tr(i));
				}
				var sub_add_tr = document_createElement("tr");
				var sub_add_td = document_createElement("td");
				var sub_add_btn = document_createElement("button");
				sub_add_btn.innerText = "+";
				sub_add_btn.title = _("Add keybinding");
				sub_add_btn.classList.add("small");
				sub_add_btn.onclick = function() {
					var last_index = -1;
					for (var i = indices.length - 1; i >= 0; i--) {
						if (indices[i] >= 0) {
							last_index = indices[i];
							break;
						}
					}
					indices.push(last_index + 1);
					values.push([]);
					sub.insertBefore(add_keyseq_tr(indices.length - 1, true), sub_add_tr);
					recalculate_removebtns();
				};
				sub_add_td.appendChild(sub_add_btn);
				sub_add_tr.appendChild(sub_add_td);
				sub.appendChild(sub_add_tr);
				value_td.appendChild(sub);
			} else if (type === "combo") {
				var sub = document_createElement("select");
				var null_option = null;
				for (var coption in meta.options) {
					if (!coption || coption[0] === '_')
						continue;
					var coption_obj = meta.options[coption];
					var trans_name = coption_obj.name;
					if (!("name_gettext" in coption_obj) || coption_obj.name_gettext) {
						trans_name = _(trans_name);
					}
					var optionid = "input_" + setting + "_" + coption;
					label_texts[optionid] = trans_name;
					var optionel = document_createElement("option");
					optionel.innerText = trans_name;
					optionel.value = coption;
					optionel.id = optionid;
					if (coption_obj.description) {
						optionel.title = _(coption_obj.description);
					}
					if (coption_obj.is_null)
						null_option = coption;
					sub.appendChild(optionel);
				}
				var sub_value = settings[setting];
				if (sub_value === null && null_option) {
					sub_value = null_option;
				}
				sub.value = sub_value;
				sub.onchange = function() {
					var value = sub.value;
					if (value in meta.options && meta.options[value].is_null) {
						value = null;
					}
					do_update_setting(setting, value, meta);
					check_disabled_options();
					show_warnings();
				};
				value_td.appendChild(sub);
			}
			tr.appendChild(value_td);
			option.appendChild(table);
			if (description && settings.settings_visible_description) {
				var description_el = document_createElement("p");
				md_to_html(description_el, description);
				//description_el.innerText = description;
				description_el.classList.add("description");
				option.appendChild(description_el);
			}
			if (meta.warning) {
				var warning = document_createElement("p");
				warning.style.display = "none";
				warning.classList.add("warning");
				option.appendChild(warning);
			}
			var requirements = document_createElement("div");
			//requirements.style.display = "none";
			requirements.classList.add("requirements");
			requirements.classList.add("hidden");
			option.appendChild(requirements);
			if (meta.example_websites) {
				var examples = document_createElement("ul");
				examples.classList.add("examples");
				for (var example_i = 0; example_i < meta.example_websites.length; example_i++) {
					var example_text = meta.example_websites[example_i];
					var example_el = document_createElement("li");
					example_el.innerText = _(example_text);
					examples.appendChild(example_el);
				}
				option.appendChild(examples);
			}
			if (meta.documentation) {
				var get_title = function(expanded) {
					// ⯈
					var arrow = "%E2%AF%88";
					if (expanded) {
						// ⯆
						arrow = "%E2%AF%86";
					}
					return decodeURIComponent(arrow) + " " + _(meta.documentation.title);
				};
				var text = get_title(false);
				var spoiler_title = document_createElement("span");
				spoiler_title.classList.add("spoiler-title");
				spoiler_title.innerText = text;
				var expanded = false;
				spoiler_title.onclick = function() {
					expanded = !expanded;
					if (expanded) {
						spoiler_contents.style.display = "block";
					} else {
						spoiler_contents.style.display = "none";
					}
					spoiler_title.innerText = get_title(expanded);
				};
				var spoiler_contents = document_createElement("div");
				spoiler_contents.classList.add("spoiler-contents");
				spoiler_contents.style.display = "none";
				spoiler_contents.innerHTML = meta.documentation.value;
				option.appendChild(spoiler_title);
				option.appendChild(spoiler_contents);
			}
			var errordiv = document_createElement("div");
			errordiv.classList.add("error");
			errordiv.classList.add("hidden");
			option.appendChild(errordiv);
			if (meta.category) {
				var subcat = meta.category;
				if (meta.subcategory)
					subcat += "_" + meta.subcategory;
				subcategory_els[subcat].appendChild(option);
			} else {
				options_el.appendChild(option);
			}
		};
		var settingslist = Object.keys(settings);
		if (settings.settings_alphabetical_order) {
			settingslist.sort(function(a, b) {
				var a_meta = settings_meta[a];
				var b_meta = settings_meta[b];
				if (!a_meta || !b_meta || !a_meta.name || !b_meta.name) {
					return a.localeCompare(b);
				}
				return _(a_meta.name).localeCompare(_(b_meta.name));
			});
		}
		for (var i = 0; i < settingslist.length; i++) {
			add_setting_dom(settingslist[i]);
		}
		check_disabled_options();
		show_warnings();
		for (var category in category_els) {
			var our_els = category_els[category];
			if (!(category in category_settings)) {
				for (var i = 0; i < our_els.length; i++) {
					our_els[i].parentNode.removeChild(our_els[i]);
				}
			}
		}
		for (var subcategory in subcategory_els) {
			var our_el = subcategory_els[subcategory];
			if (our_el.querySelectorAll(".option").length === 0) {
				our_el.parentNode.removeChild(our_el);
			}
		}
		document.body.appendChild(saved_el);
		options_el_real.appendChild(options_el);
		options_el = options_el_real;
	}