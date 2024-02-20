function mapProp(prop, targetObj) {
	if(Array.isArray(prop)) {
		let otherprops = [];
		prop =  prop.map(entry => {
			// TODO this only works as the first entry
			if(entry === ":newest") {
				entry = Object.keys(targetObj).sort().pop();
			} else if(entry.indexOf("||") > -1) {
				for(let key of entry.split("||")) {
					if(lodash.get(targetObj, [...otherprops, key])) {
						entry = key;
						break;
					}
				}
			}
			otherprops.push(entry);

			return entry;
		});
	}

	return prop;
}