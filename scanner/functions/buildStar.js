function buildStar(i){

			var starHolder =  document.createElement("span");
			var nextStar = star.cloneNode(true);

			stars.push(nextStar);

			starHolder.addEventListener("mouseenter", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
				starChange(i);
			});

			starHolder.addEventListener("mousemove", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
			});

			starHolder.addEventListener("click", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
				success(i);
				element.blur();
			});

			starHolder.appendChild(nextStar);
			starsHolder.appendChild(starHolder);

		}