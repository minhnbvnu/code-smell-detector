function create_progress_el(position_top) {
			var progressc_el = document_createElement("div");
			set_el_all_initial(progressc_el);
			progressc_el.style.backgroundColor = "rgba(0,0,0,0.7)";
			//progressc_el.style.padding = "1em";
			progressc_el.style.height = "2em";
			progressc_el.style.zIndex = maxzindex - 2;
			var progressb_el = document_createElement("div");
			set_el_all_initial(progressb_el);
			progressb_el.style.position = "absolute";
			progressb_el.style.top = "0px";
			progressb_el.style.left = "0px";
			//progressb_el.style.backgroundColor = "#00aa00";
			progressb_el.style.backgroundColor = "#00aaff";
			progressb_el.style.height = "100%";
			progressb_el.style.width = "0%";
			progressb_el.style.zIndex = maxzindex - 1;
			progressc_el.appendChild(progressb_el);
			if (position_top) {
				progressc_el.style.position = "fixed";
				progressc_el.style.top = "0px";
				progressc_el.style.left = "0px";
				progressc_el.style.width = "80%";
				progressc_el.style.marginTop = "100px";
				progressc_el.style.marginLeft = "10%";
				document.documentElement.appendChild(progressc_el);
			}
			return progressc_el;
		}