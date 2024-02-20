function remote_invoke(method, args, responseId){
	try {
		post("received recponseId " + responseId + "\n");
		args = JSON.parse(args)
		var response = this[method](args)
		out(responseId, response)
	} catch (e){
		out(responseId, { error : e })
	}
}