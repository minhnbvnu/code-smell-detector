function magic() {
			this.off(type, magic);

			if (!fired) {
				fired = true;
				fn.apply(context, arguments);
			}
		}