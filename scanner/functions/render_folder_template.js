async function render_folder_template(folder_view, address, eventHandlers) {
	// Before removing the iframe containing folder_view, adopt the element to preserve event listeners (i.e. marquee functionality etc.)
	document.adoptNode(folder_view.element);

	// if (folder_view.config.view_as_web_page === false) {
	// 	$("#content").append(folder_view.element);
	// 	folder_view.focus();
	// 	return;
	// }

	let htt, template_url;
	if (folder_view.config.view_as_web_page === false) {
		// I'm faking the "View as Web Page" option for now
		// everything's in iframes anyways, so what's the harm in one more iframe, right?
		// I'm treating this option as just "to use folder templates or not".
		htt = `
			<object border=0 tabindex=1 classid="clsid:1820FED0-473E-11D0-A96C-00C04FD705A2" style="height: 100%; width: 100%;"></object>
		`;
		template_url = "https://isaiahodhner.io/lock-ness-monster/sorry"; // valid URL, but nonsense (I'm a little bit tired so doing things stupidly)
	} else {
		// @TODO: load FOLDER.HTT from the folder we're showing, if it exists
		const template_file_name =
			address === "/recycle-bin/" ? "recycle.htt" :
				address === "/network-neighborhood/" ? "nethood.htt" :
					// address === "/my-computer/" ? "MYCOMP.HTT" : // I don't have a proper My Computer folder yet
					"FOLDER.HTT";
		template_url = new URL(`/src/WEB/${template_file_name}`, location.href);
		// console.log("fetching template", template_url.href);
		htt = await (await fetch(template_url)).text();
	}

	const percent_vars = {
		THISDIRPATH: new URL(address.replace(/\/$/, ""), location.href),
		THISDIRNAME: get_display_name_for_address(address),
		TEMPLATEDIR: new URL(".", template_url).toString(),
		//template_url.href.split("/").slice(0, -1).join("/"),
	};
	const percent_var_regexp = /(file:\/\/)?(\\\w*\\?)*%([A-Z_]+)%(\\\w*\\?)*/gi;
	let html = htt.replaceAll(percent_var_regexp, (match, file_protocol, path_before, var_name, path_after) => {
		if (var_name in percent_vars) {
			return (
				// drop the file:// protocol (if applicable)
				(path_before ?? "").replace(/\\/g, "/") +
				percent_vars[var_name] +
				(path_after ?? "").replace(/\\/g, "/")
			);
		} else {
			console.warn("Unknown percent variable:", match);
			return match;
		}
	});

	const named_color_to_css_var = {
		ActiveBorder: "var(--ActiveBorder)", // Active window border.
		ActiveCaption: "var(--ActiveTitle)", // Active window caption.
		AppWorkspace: "var(--AppWorkspace)", // Background color of multiple document interface.
		Background: "var(--Background)", // Desktop background.
		ButtonFace: "var(--ButtonFace)", // Face color for three-dimensional display elements.
		ButtonHighlight: "var(--ButtonHilight)", // Dark shadow for three-dimensional display elements(for edges facing away from the light source).
		ButtonShadow: "var(--ButtonShadow)", // Shadow color for three-dimensional display elements.
		ButtonText: "var(--ButtonText)", // Text on push buttons.
		CaptionText: "var(--TitleText)", // Text in caption, size box, and scrollbar arrow box.
		GrayText: "var(--GrayText)", // Grayed(disabled) text.This color is set to #000 if the current display driver does not support a solid gray color.
		Highlight: "var(--Hilight)", // Item(s) selected in a control.
		HighlightText: "var(--HilightText)", // Text of item(s) selected in a control.
		InactiveBorder: "var(--InactiveBorder)", // Inactive window border.
		InactiveCaption: "var(--InactiveTitle)", // Inactive window caption.
		InactiveCaptionText: "var(--InactiveTitleText)", // Color of text in an inactive caption.
		InfoBackground: "var(--InfoWindow)", // Background color for tooltip controls.
		InfoText: "var(--InfoText)", // Text color for tooltip controls.
		Menu: "var(--Menu)", // Menu background.
		MenuText: "var(--MenuText)", // Text in menus.
		Scrollbar: "var(--Scrollbar)", // Scroll bar gray area.
		ThreeDDarkShadow: "var(--ButtonDkShadow)", // Dark shadow for three-dimensional display elements.
		ThreeDFace: "var(--ButtonFace)", // Face color for three-dimensional display elements.
		ThreeDHighlight: "var(--ButtonHilight)", // Highlight color for three-dimensional display elements.
		ThreeDLightShadow: "var(--ButtonLight)", // Light color for three-dimensional display elements(for edges facing the light source).
		ThreeDShadow: "var(--ButtonShadow)", // Dark shadow for three-dimensional display elements.
		Window: "var(--Window)", // Window background.
		WindowFrame: "var(--WindowFrame)", // Window frame.
		WindowText: "var(--WindowText)", // Text in windows.
	};
	const lowercase_named_color_to_css_var = Object.fromEntries(
		Object.entries(named_color_to_css_var)
			.map(([key, value]) => [key.toLowerCase(), value])
	);
	const named_color_regexp = new RegExp(`\b(${Object.keys(named_color_to_css_var).join("|")})\b(?!\s*[)?.:=\[])`, "gi");
	html = html.replaceAll(named_color_regexp, (match, color_name) =>
		lowercase_named_color_to_css_var[color_name.toLowerCase()]
	);

	const doc = new DOMParser().parseFromString(html, "text/html");
	$(doc).find("script").each((i, script) => {
		if (script.getAttribute("language") === "JavaScript") {
			script.removeAttribute("language");
		}
		if (script.hasAttribute("for")) {
			script.removeAttribute("for");
		}
		// HACK: making everything global so I can wrap things in functions
		// JUSTIFICATION: most stuff is probably global already in this ancient HTML
		// const to_export = script.textContent.matchAll(/(function|var)\s+([a-zA-Z_$][\w$]*)\s*[(;=]/g);
		const func_matches = script.textContent.matchAll(/function\s+([a-zA-Z_$][\w$]*)\s*\(/g);
		let exports = "";
		for (const func_match of func_matches) {
			const func_name = func_match[1];
			exports += `window.${func_name} = ${func_name};\n`;
		}
		// first handle `var foo;`
		script.textContent = script.textContent.replaceAll(
			/var\s([a-zA-Z_$][\w$]*)[;\n\r]/g,
			"/*var*/ window.$1 = undefined;"
		);
		// then handle `var foo = bar;`
		script.textContent = script.textContent.replaceAll(/var\s/g, "/*var*/ window.");

		if (script.hasAttribute("event")) {
			const event_name = script.getAttribute("event");
			script.removeAttribute("event");
			script.textContent = `addEventListener("${event_name}", (event) => {
${script.textContent}
${exports}
});`;
		} else {
			script.textContent = `(() => { /* make top level return valid */
${script.textContent}
${exports}
})();`;
		}
	});

	// html = new XMLSerializer().serializeToString(doc);
	html = `<!doctype html>
${doc.documentElement.outerHTML}`;

	// This function will be run in the context of the iframe.
	// It is here for syntax highlighting/checking/formatting,
	// and avoiding escaping complexities, but it will be stringified,
	// so note that variables can not be referenced from the outer scope.
	const head_end_injected_script_fn = () => {
		// Usually the scripts refer to "document.all.FileList", but sometimes use just "FileList",
		// relying on the fact that IDs pollute the global namespace.
		// FileList is a built-in API nowadays, so it conflicts.
		Object.defineProperty(window, "FileList", {
			get() { return document.getElementById("FileList"); }
		});

		// It uses pixelWidth/pixelHeight/pixelLeft/pixelTop and unitless top/left
		// Originally I polyfilled this on `style`, but it broke `setProperty()` in Firefox (and maybe Chrome but it doesn't seem to come up as a problem somehow?)
		// so I've changed it to a separate `styleHack` property, making the generality of this solution rather pointless.
		// It was an interesting exercise.
		var real_style_descriptor = Reflect.getOwnPropertyDescriptor(HTMLElement.prototype, "style");
		Object.defineProperty(HTMLElement.prototype, "styleHack", {
			get: function () {
				const element = this;
				const style = real_style_descriptor.get.call(element);
				return new Proxy(style, {
					get: function (target, prop, receiver) {
						// Not sure how these should behave for different values of box-sizing (if that was even around back then)
						if (prop === "pixelWidth") {
							return Math.round(element.offsetWidth);
						}
						if (prop === "pixelHeight") {
							return Math.round(element.offsetHeight);
						}
						if (prop === "pixelLeft") {
							return Math.round(element.offsetLeft);
						}
						if (prop === "pixelTop") {
							return Math.round(element.offsetTop);
						}
						return Reflect.get(style, prop, style);
					},
					set: function (target, prop, value) {
						if (prop === "pixelWidth") {
							target.width = value + "px";
							return;
						}
						if (prop === "pixelHeight") {
							target.height = value + "px";
							return;
						}
						if (prop === "pixelLeft" || (prop === "left" && `${value}`.match(/^\d+$/))) {
							target.left = value + "px";
							return;
						}
						if (prop === "pixelTop" || (prop === "top" && `${value}`.match(/^\d+$/))) {
							target.top = value + "px";
							return;
						}
						return Reflect.set(style, prop, value);
					},
				});
			},
			set: function (value) {
				const element = this;
				element.style.cssText = value;
			},
			configurable: true,
			enumerable: true,
		});

		// Fix up ancient CSS in <style> and <link> tags.
		// Based on https://github.com/philipwalton/talks/tree/b0a2b9a3de509dd39368516e7e304a4159b41b08/2016-12-02/demos/src
		const getPageStyles = () => {
			// Query the document for any element that could have styles.
			var styleElements =
				[...document.querySelectorAll('style, link[rel="stylesheet"]')];

			// Fetch all styles and ensure the results are in document order.
			// Resolve with a single string of CSS text.
			return Promise.all(styleElements.map((el) => {
				if (el.href) {
					return fetch(el.href).then((response) => response.text());
				} else {
					return el.innerText;
				}
			})).then((stylesArray) => stylesArray.join('\n'));
		};
		const replacePageStyles = (css) => {
			// Get a reference to all existing style elements.
			const existingStyles =
				[...document.querySelectorAll('style, link[rel="stylesheet"]')];

			// Create a new <style> tag with all the polyfilled styles.
			const polyfillStyles = document.createElement('style');
			polyfillStyles.innerHTML = css;
			document.head.appendChild(polyfillStyles);

			// Remove the old styles once the new styles have been added.
			existingStyles.forEach((el) => el.parentElement.removeChild(el));
		};
		getPageStyles().then((css) => {
			css = css.replace(/padding:\s*((\d+(?:\.?\d+)?\w+),\s*)/g, (match, value) => value.split(/,\s*/g).join(" "));
			css = css.replace(/font:\s*(\d+pt);/, "font-size: $1; line-height: 1;");
			css = css.replace(/font:\s*((\d+pt)(\s*\/\s*\d+pt)?) verdana;/, "font: $1 'verdana', sans-serif;");
			css = css.replace(/style\.(pixel(Width|Height|Left|Top)|left|top)\b/g, "styleHack.$1");

			replacePageStyles(css);
		});

		// Neither Chrome or Firefox are working for debugging srcdoc iframes.
		// Chrome gives wildly incorrect line numbers,
		// and Firefox just gives "Error loading this URI: Unknown source"
		// or sometimes it opens view-source:about:srcdoc in a new tab ("Hmm. That address doesn’t look right.")
		// Firefox also surprisingly actually works sometimes, but it's not reliable.
		// Luckily, onerror seems to work in both browsers.
		addEventListener("error", (event) => {
			const { $window } = showMessageBox({
				message: "An error occurred.",
			});
			// $window.$content.append(`
			// 	<details>
			// 		<summary>Details</summary>
			// 		<pre class='error-pre inset-deep'></pre>
			// 		<pre class='location-pre inset-deep'></pre>
			// 	</details>
			// `)
			$window.$content.append(`
				<pre class='error-pre inset-deep'></pre>
				<pre class='location-pre inset-deep'></pre>
			`)
			$window.$content.find("pre")
				.css({
					overflow: "auto",
					maxHeight: 400,
					textAlign: "left",
					background: "var(--Window)",
					color: "var(--WindowText)",
					margin: 10,
					padding: 5,
					userSelect: "text",
					cursor: "auto",
					// whiteSpace: "pre-wrap",
				});

			$window.$content.find(".error-pre").text(event.error);

			const srcdoc = frameElement.srcdoc;
			const lines = srcdoc.split(/\r\n|\r|\n/g);

			$window.$content.find(".location-pre").append(
				lines.map((line, index) =>
					$("<div>").text(
						// ((index + 1 == event.lineno) ? "--->" : "    ") +
						(index + 1 + "").padStart(4, " ") + ": " + line
					).css({
						background: (index + 1 == event.lineno) ? "var(--Hilight)" : "",
						color: (index + 1 == event.lineno) ? "var(--HilightText)" : "",
						width: "1000%", // because ugh highlight doesn't extend to whole line if it scrolls
					})
				)
					.slice(event.lineno - 5, event.lineno + 4)
			);
		});

		// Allow message boxes to go outside the window.
		showMessageBox = parent.showMessageBox || showMessageBox;

		// Implement <object-hack>, which we'll convert <object ...> to.
		class ObjectHack extends HTMLElement {
			constructor() {
				super();
				this.attachShadow({ mode: 'open' });
				this._params_slot = document.createElement("slot");
				this.shadowRoot.append(this._params_slot);
				this._params = {};
				this._params_slot.addEventListener("slotchange", (event) => {
					this._params = {};
					for (const param_el of this.querySelectorAll("param, param-hack")) {
						this._params[param_el.getAttribute("name")] = param_el.getAttribute("value");
					}
					// console.log("slotchange, params are now:", this._params);
				});
			}
			connectedCallback() {
				// @TODO: handle params once they change/exist
				// console.log(this._params, this.children, this._params_slot.children);
				// console.log(`this.getAttribute("classid")`, this.getAttribute("classid"));
				switch (this.getAttribute("classid")) {
					case "clsid:1D2B4F40-1F10-11D1-9E88-00C04FDCAB92":
						// thumbnail
						const img = document.createElement("img");
						img.draggable = false;
						this.shadowRoot.append(img);
						this.haveThumbnail = () => {
							return false;
						};
						this.displayFile = (path) => {
							img.src = path;
						}
						break;
					case "clsid:E5DF9D10-3B52-11D1-83E8-00A0C90DC849":
						// folder icon
						{
							const img = document.createElement("img");
							img.draggable = false;
							this.shadowRoot.append(img);
							img.src = frameElement._folder_icon_src;
						}
						break;
					case "clsid:1820FED0-473E-11D0-A96C-00C04FD705A2":
						// folder view
						const folder_view = frameElement._folder_view;
						this.shadowRoot.append(folder_view.element);
						// jQuery's append does HTML, vs native which does Text
						$(this.shadowRoot).append(`
							<link href="/layout.css" rel="stylesheet" type="text/css">
							<link href="/classic.css" rel="stylesheet" type="text/css">
							<link href="/lib/os-gui/layout.css" rel="stylesheet" type="text/css">
							<link href="/lib/os-gui/windows-98.css" rel="stylesheet" type="text/css">
							<style>
								:host {
									display: flex;
								}
								.folder-view {
									background: var(--Window); /* needed for mix-blend-mode */
									color: var(--WindowText);
								}
								.desktop-icon .title {
									/* background: transparent; */
									/* mix-blend-mode seems to need a background (for the dotted focus effect) */
									background: var(--Window);
									color: var(--WindowText);
								}
							</style>
						`);

						this.SelectedItems = () => {
							const selected_items = folder_view.items.filter((item) => item.element.classList.contains("selected"));
							return {
								Count: selected_items.length,
								Item: (index) => {
									const item = selected_items[index];
									if (!item) {
										return {}; // ???
									}
									return {
										Name: item.element.querySelector(".title").textContent,
										Size: item.resolvedStats?.size,
										Path: item.file_path,
										_item: item,
									};
								},
							};
						};
						// These keys may actually be different depending on the system folder.
						// My Computer (MYCOMP.HTT) seems to use 1 for Type
						const detail_key = {
							"-1": "Tip", // description of the item, for control panel items, computers, and printers
							0: "Name",
							1: "Size", // file size as a string
							2: "Type", // file type
							3: "Modified", // modification date
						};
						this.Folder = {
							GetDetailsOf: (item, detail_id) => {
								// console.log("GetDetailsOf", item, detail_id);
								// return `{GetDetailsOf(${JSON.stringify(item)}, ${detail_id})}`; // debugging in the style of a broken template
								if (item == null) {
									return detail_key[detail_id];
								} else if (Object.keys(item).length === 0) {
									return "";
								} else {
									switch (detail_key[detail_id]) {
										case "Tip":
											return item._item.description || "";
										case "Name":
											return item.Name;
										case "Size":
											const bytes = item._item.resolvedStats?.size;
											if (typeof bytes !== "number") {
												return "";
											}
											// Note: Windows 98 uses 2^10 for KB, and uses KB as the minimum unit,
											// but the folder templates, wanting to use bytes for small files,
											// show the size in bytes if it's less than 1000, implying it uses 10^3 for KB.
											// This may confuse people, but I'm just imitating Windows 98. No skin off my back!
											const k = 1024;
											if (bytes === 0) return '0KB';
											const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
											const min_unit = 1; // Start at KB (note that the default template works around this to provide "bytes")
											const i = Math.max(min_unit, Math.floor(Math.log(bytes) / Math.log(k)));
											return Math.ceil(bytes / Math.pow(k, i)) + sizes[i]; // Round up
										case "Type":
											// @TODO: DRY, and move file type code/data to one central place
											const system_folder_path_to_name = {
												"/": "(C:)", //"My Computer",
												"/my-pictures/": "My Pictures",
												"/my-documents/": "My Documents",
												"/network-neighborhood/": "Network Neighborhood",
												"/desktop/": "Desktop",
												"/programs/": "Program Files",
												"/recycle-bin/": "Recycle Bin",
											};
											if (system_folder_path_to_name[item._item.file_path]) {
												return "System Folder";
											}
											if (item._item.resolvedStats?.isDirectory?.()) {
												return "Folder";
											}
											const match = item._item.file_path.match(/\.(\w+)?$/);
											if (match) {
												return match[1].toUpperCase() + " File";
											} else {
												return "Unknown File";
											}
										case "Modified":
											return new Date(item._item.resolvedStats?.mtime).toLocaleString()
												.replace(/, (\d+):(\d+):(\d+)/, " $1:$2"); // Remove the comma and seconds place (doing this as one replace to hopefully not affect other locales negatively)
										default:
											console.warn("Unknown detail ID", detail_id);
											return;
									}
								}
							}
						};
						break;
					case "clsid:05589FA1-C356-11CE-BF01-00AA0055595A":
						// media player
						const video = document.createElement("video"); // @TODO: or audio
						video.src = params.FileName;
						video.controls = true;
						this.shadowRoot.append(video);
						break;
					default:
						console.warn("Unsupported classid value:", this.getAttribute("classid"), this);
						break;
				}
			}
		}
		customElements.define("object-hack", ObjectHack);
	};
	html = html.replace(/<object/ig, "<object-hack");
	html = html.replace(/<\/object/ig, "</object-hack");
	html = html.replace(/<param/ig, "<param-hack");
	html = html.replace(/<\/param/ig, "</param-hack");

	const head_start_injected_html = `
		<meta charset="utf-8">
		<title>Folder Template</title>
		<link href="/src/ie-6.css" rel="stylesheet" type="text/css">
		<style>
		p {margin: 0;}

		#Panel {
			scrollbar-gutter: stable;
		}

		body {
			user-select: none;
		}
		</style>
	`;

	const head_end_injected_html = `
		<link href="/layout.css" rel="stylesheet" type="text/css">
		<link href="/classic.css" rel="stylesheet" type="text/css">
		<link href="/lib/os-gui/layout.css" rel="stylesheet" type="text/css">
		<link href="/lib/os-gui/windows-98.css" rel="stylesheet" type="text/css">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<script src="/lib/jquery.min.js"></script>
		<script src="/lib/os-gui/$Window.js"></script>
		<script src="/src/msgbox.js"></script>
		<script>defaultMessageBoxTitle = "Explorer";</script>
		<script>
			(${head_end_injected_script_fn})();
		</script>
	`;

	html = html.replace(/<head>/i, (match) => `${match}\n${head_start_injected_html}\n`);
	html = html.replace(/\s+<\/head>/i, (match) => `${head_end_injected_html}\n${match}`);

	// Empty and append after any async loading (i.e. of the template), to avoid race conditions where multiple contents are appended,
	// if you select multiple folders and hit Enter. It was kinda cool, like a split pane feature, but very not legit.
	$("#content").empty();

	$iframe = $("<iframe>").attr({
		srcdoc: html,
	}).appendTo("#content");

	$iframe[0]._folder_view = folder_view;
	$iframe[0]._folder_icon_src = getIconPath(get_icon_for_address(address), 32);

	enhance_iframe($iframe[0]);

	$iframe.on("load", () => {
		var doc = $iframe[0].contentDocument;
		// const object = doc.querySelector("object[classid='clsid:1820FED0-473E-11D0-A96C-00C04FD705A2']");
		// $(object).replaceWith(folder_view.element);
		// for (var i = 0; i < object.attributes.length; i++) {
		// 	var attribute = object.attributes[i];
		// 	folder_view.element.setAttribute(attribute.name, attribute.value);
		// }

		// not working:
		// var range = doc.createRange();
		// range.selectNode(doc.head); // sets context node
		// var document_fragment = range.createContextualFragment(head_inject_html);
		// document.head.appendChild(document_fragment);

		// not working:
		// $iframe.contents()
		// 	.find("head")
		// 	.append(head_inject_html);

		eventHandlers.onStatus = ({ items, selectedItems }) => {
			doc.dispatchEvent(new CustomEvent("SelectionChanged", { bubbles: true }));
			// @TODO: render preview of selected item(s?), and trigger OnThumbnailReady
		};

		// console.log("folder_view.element.isConnected", folder_view.element.isConnected);
		folder_view.focus();
	});
	$iframe.focus();
}