function myUserNameFunction (data) {
	// Updates username with whatever ExtendScript function returns.
	var user_name			= document.getElementById("username");
	user_name.innerHTML		= data;
}