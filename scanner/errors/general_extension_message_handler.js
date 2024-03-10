function general_extension_message_handler(message, sender, respond) {
		if (_nir_debug_) {
			console_log("general_extension_message_handler", message);
		}
		if (message.type === "settings_update") {
			//console_log(message);
			settings_updated_cb(message.data.changes);
		} else if (message.type === "request") {
			var response = message.data;
			if (!(response.id in extension_requests)) {
				// this happens when there's more than one frame per tab
				if (_nir_debug_) {
					console_log("Request ID " + response.id + " not in extension_requests");
				}
				return;
			}
			var request_final = function() {
				var reqdata = extension_requests[response.id].data;
				var events = [
					"onload",
					"onerror",
					"onprogress",
					"onabort",
					"ontimeout"
				];
				var handled = false;
				for (var i = 0; i < events.length; i++) {
					var event = events[i];
					if (response.event === event && reqdata[event]) {
						if (_nir_debug_) {
							console_log("Running " + event + " for response", response);
						}
						reqdata[event](response.data);
						handled = true;
					}
				}
				if (_nir_debug_ && !handled) {
					console_warn("No event handler for", response);
				}
				if (response.final) {
					delete extension_requests[response.id];
				}
			};
			if (response.data && response.data.responseType === "blob") {
				var enc = response.data._responseEncoded;
				if (enc) {
					var wanted_responseType = "blob";
					if (response.data._wanted_responseType === "arraybuffer")
						wanted_responseType = "arraybuffer";
					if (enc.value) {
						var value_array = new Uint8Array(enc.value.length);
						for (var i = 0; i < enc.value.length; i++) {
							value_array[i] = enc.value.charCodeAt(i);
						}
						if (wanted_responseType === "blob") {
							try {
								response.data.response = new native_blob([value_array.buffer], { type: enc.type });
							} catch (e) {
								console_error(e);
								response.data.response = null;
							}
						} else {
							response.data.response = value_array.buffer;
						}
					} else if (enc.objurl) {
						// based on https://stackoverflow.com/a/23856573/13255485
						var xhr = new XMLHttpRequest();
						xhr.open("GET", enc.objurl);
						xhr.responseType = wanted_responseType;
						xhr.onload = function() {
							revoke_objecturl(enc.objurl);
							response.data.response = xhr.response;
							request_final();
						};
						xhr.onerror = function() {
							revoke_objecturl(enc.objurl);
							console_error("Unable to load blob for", enc, xhr);
							response.data.response = null;
							request_final();
						};
						xhr.send();
						return;
					}
				} else {
					response.data.response = null;
				}
			} else if (response.data && response.data.responseText && !response.data.response) {
				response.data.response = response.data.responseText;
			}
			request_final();
		} else if (message.type === "bg_redirect") {
			if (settings.redirect && settings.redirect_extension && settings.imu_enabled) {
				try {
					var headers = headers_list_to_dict(message.data.responseHeaders);
					if (headers["content-type"] && contenttype_can_be_redirected(headers["content-type"])) {
						do_redirect_sub(message.data.url, false, function(newurl, obj) {
							send_redirect(obj, function() {
								chrome.tabs.update(message.data.tabId, {
									url: newurl
								});
							}, message.data.tabId);
						});
					}
				} catch (e) {
					console_error(e);
				}
			}
		} else if (message.type === "get_localstorage") {
			if (_localstorage_check_origin(message.data.url)) {
				respond(_localstorage_get_items(message.data.keys, message.data.options));
			} else {
				respond(null);
			}
		}
	}