function fsError(e) {
	//Something went wrong with the file system. Keep it simple for the end user.
	console.log("FS Error", e);
	navigator.notification.alert("Sorry, an error was thrown.", null,"Error");
}