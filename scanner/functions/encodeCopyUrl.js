function encodeCopyUrl(path) {
            return (config.clipboard.encodeCopyUrl) ? encodePath(path) : path;
		}