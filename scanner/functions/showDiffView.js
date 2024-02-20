function showDiffView(originalImg) {
		if (cleanUp) { cleanUp(); }

		var screenshotWidth = originalImg.naturalWidth / 3;
		var screenshotHeight = originalImg.naturalHeight;
		originalImg.style.opacity = "0";
		var img = document.createElement("img");
		img.src = originalImg.src;
		img.style.position = "absolute";
		img.style.left = "0";
		img.style.pointerEvents = "all";
		img.draggable = false;
		img.addEventListener("mouseenter", ()=> {
			img.style.left = `${-2 * screenshotWidth}px`;
		});
		img.addEventListener("mouseleave", ()=> {
			img.style.left = "0";
		});
		var container = document.createElement("div");
		container.style.width = `${screenshotWidth}px`;
		container.style.height = `${screenshotHeight}px`;
		container.style.position = "relative";
		container.style.overflow = "hidden";
		container.style.margin = "auto";
		var outerContainer = document.createElement("div");
		outerContainer.style.position = "fixed";
		outerContainer.style.display = "flex";
		outerContainer.style.left = "0";
		outerContainer.style.right = "0";
		outerContainer.style.top = "0";
		outerContainer.style.bottom = "0";
		outerContainer.style.zIndex = "100000";
		outerContainer.style.pointerEvents = "none";

		outerContainer.appendChild(container);
		container.appendChild(img);
		document.body.appendChild(outerContainer);

		cleanUp = ()=> {
			originalImg.style.opacity = "";
			container.style.transformOrigin = "center center";
			container.style.transition = "opacity 0.2s ease, transform 0.2s ease";
			container.style.opacity = 0;
			container.style.transform = "scale(0.9)";
			setTimeout(()=> {
				outerContainer.remove();
			}, 500);
			cleanUp = null;
		};
	}