function debounce(func, wait_ms, immediate) {
		let timeout;
		const debounced_func = function () {
			const context = this;
			const args = arguments;

			const later = () => {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};

			const callNow = immediate && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout(later, wait_ms);

			if (callNow) {
				func.apply(context, args);
			}
		};
		debounced_func.cancel = () => {
			clearTimeout(timeout);
		};
		return debounced_func;
	}