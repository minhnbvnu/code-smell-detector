function get_up_address(address) {
	return address.replace(/[^\/]*\/?$/, "").replace(/(https?|ftps?|sftp|file):\/\/\/?$/, "") || "/";
}