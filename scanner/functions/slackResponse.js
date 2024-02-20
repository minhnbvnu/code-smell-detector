function slackResponse(text, attachmentText) {
	let content = {
		response_type: 'in_channel',
		text: text,
		attachments: [],
	};

	if (attachmentText.length > 0) {
		attachmentText.forEach(val => {
			content.attachments.push({ text: val });
		});
	}

	try {
		return new Response(JSON.stringify(content), {
			headers: jsonHeaders,
			status: 200,
		});
	} catch (e) {
		return simpleResponse(200, 'Sorry, I had an issue generating a response. Try again in a bit!');
	}
}