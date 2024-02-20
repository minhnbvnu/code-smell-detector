function humanize (withSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }

	        var locale = this.localeData();
	        var output = relativeTime$1(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }