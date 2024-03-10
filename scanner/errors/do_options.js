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