function has_capability(data, cap) {
	if (data['File Type'] == 'dir' && cap == 'replace') return false;
	if (data['File Type'] == 'dir' && cap == 'download') {
		if(config.security.allowFolderDownload == true) return true;
		else return false;
	}
	if (typeof(data['Capabilities']) == "undefined") return true;
	else return $.inArray(cap, data['Capabilities']) > -1;
}