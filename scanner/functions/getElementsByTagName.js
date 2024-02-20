function getElementsByTagName (tag, parent) {
				tag = tag || "*";
				parent = parent || document;
				return (parent === document || parent.lastModified)? tagCache[tag] || (tagCache[tag] = getTags(tag, document)) : getTags(tag, parent);
			}