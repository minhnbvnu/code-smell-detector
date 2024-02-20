function get_icon_for_address(address) {
	// TODO: maintain less fake naming abstraction
	// base it more on the actual filesystem
	if (address === "/") { // currently / is our C:\ analog (or C:\Windows\)
		return "hard-disk-drive";
		// }else if(address === "/my-computer/"){ // we don't have an actual My Computer location yet, it just opens (C:)
		// 	return "my-computer";
	} else if (address === "/my-documents/") {
		return "my-documents";
	} else if (address === "/network-neighborhood/") {
		return "network";
	} else if (address === "/desktop/") { // i.e. C:\Windows\Desktop
		return "desktop";
	} else if (address.match(/^\w+:\/\//) || address.match(/\.html?$/)) {
		return "html";
	} else {
		return "folder-open";
	}
}