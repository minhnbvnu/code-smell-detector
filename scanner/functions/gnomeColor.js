function gnomeColor(color) {
				return color.toString().replace(/#(.{2})(.{2})(.{2})/, '#$1$1$2$2$3$3');
			}