function MinttyName(name) {
				if (0 === name.indexOf('bright_')) {
					name = name.substring('bright_'.length);
					return 'Bold' + name.charAt(0).toUpperCase() + name.slice(1);
				} else {
					return name.charAt(0).toUpperCase() + name.slice(1);
				}
			}