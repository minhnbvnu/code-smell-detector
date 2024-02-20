function setEmail(e) {
	user.set({email:e.source.value});
	user.save();
}