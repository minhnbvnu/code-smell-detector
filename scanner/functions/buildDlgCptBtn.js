function buildDlgCptBtn(text, classname, callback) {
		if (!callback) classname = "";
		const btn = document.createElement("a");
		btn.className = "dlg-cpt-btn" + (classname ? " " + classname : "");
		if (typeof(callback) == "string") {
			btn.target = "_blank";
			btn.href = callback;
		} else {
			if (callback)
				btn.addEventListener("click", callback);
		}
		var btnTxt = btn.appendChild(document.createElement("span"));
		btnTxt.className = "dlg-cpt-btn-text";
		btnTxt.innerHTML = text;

		return btn;
	}