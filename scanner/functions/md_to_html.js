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