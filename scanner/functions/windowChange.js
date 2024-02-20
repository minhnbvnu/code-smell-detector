function windowChange() {
				if ($(window).width() <= 1020) {
					setRel();
					return false;
				}

				//documentElement.scrollTo works for IE/Firefox (Gecko); self.pageYOffset for Chrome/Safari(Webkit))
				if (document.documentElement.scrollTop > offset || self.pageYOffset > offset) {
				   setFixed();

				} else if (document.documentElement.scrollTop < offset || self.pageYOffset < offset) {
				   setAb();
				};
			}