function lookupConnection(name) {
	if(connections[name]) { // serial number
		return connections[name];
	}
	if(nameToAddr[name]) { // name
		return connections[nameToAddr[name]];
	}
	return null;
}