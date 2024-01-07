function load_language(language) {
		// const prev_language = current_language;

		const stylesheets = [...document.querySelectorAll(".flippable-layout-stylesheet")];
		for (const stylesheet of stylesheets) {
			let href = stylesheet.getAttribute("href");
			if (get_direction(language) === "rtl") {
				if (href.indexOf(".rtl.css") === -1) {
					href = href.replace(/\.css$/i, ".rtl.css");
				}
			} else {
				if (href.indexOf(".rtl.css") > -1) {
					href = href.replace(/\.rtl\.css$/i, ".css");
				}
			}
			stylesheet.setAttribute("href", href);
			// hack to wait for stylesheet to load
			const img = document.createElement("img");
			img.onerror = () => {
				$(() => {
					$G.triggerHandler("theme-load"); // signal layout change
				});
			};
			img.src = href;
		}

		if (language === base_language) {
			localizations = {};
			current_language = base_language;
			return;
		}
		// fetch(`localization/${language}/localizations.json`)
		// .then((response)=> response.json())
		// .then((new_localizations)=> {
		// 	localizations = new_localizations;
		// 	current_language = language;
		// }).catch((error)=> {
		// 	show_error_message(`Failed to load localizations for ${language_names[language]}.`, error);
		// 	current_language = prev_language;
		// });
		const src = `localization/${language}/localizations.js`;
		document.write(`<script src="${src}"></${""/*(avoiding ending script tag if inlined in HTML)*/}script>`);
	}