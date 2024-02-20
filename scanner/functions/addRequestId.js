function addRequestId(request, response, next) {
	// Create a random request (nano)id, 10 characters long
	// Nano ids are [0-9A-Za-z_-] so chance of collision is 1 in 64^10
	// If a site has so much traffic that this chance is too high
	//  we probably have worse things to worry about
	request.id = nanoid(10);
	next();
}