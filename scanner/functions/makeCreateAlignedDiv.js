function makeCreateAlignedDiv(alignment) {
			return function () {
				var newParent = document.createElement("div");
				newParent.setAttribute("style", "text-align: " + alignment);
				return newParent;
			};
		}