function starChange(val){
			stars.forEach(function(star, i){
				if(i < val){
					if(self.table.browser == "ie"){
						star.setAttribute("class", "tabulator-star-active");
					}else {
						star.classList.replace("tabulator-star-inactive", "tabulator-star-active");
					}

					star.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				}else {
					if(self.table.browser == "ie"){
						star.setAttribute("class", "tabulator-star-inactive");
					}else {
						star.classList.replace("tabulator-star-active", "tabulator-star-inactive");
					}

					star.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				}
			});
		}