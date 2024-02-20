async function slackWebhookHandler(request) {
	// As per: https://api.slack.com/slash-commands
	// - Slash commands are outgoing webhooks (POST requests)
	// - Slack authenticates via a verification token.
	// - The webhook payload is provided as POST form data

	if (request.method != 'POST') {
		return simpleResponse(
			200,
			`Hi, I'm ${BOT_NAME}, a Slack bot for fetching the latest crypto-currenncy prices. Find my source code at ${REPO_URL}`
		);
	}

	let formData;
	try {
		formData = await request.formData();
		if (formData.get('token').toString() !== SLACK_TOKEN) {
			return simpleResponse(403, 'invalid Slack verification token');
		}
	} catch (e) {
		return simpleResponse(400, 'could not decode POST form data');
	}

	try {
		let parsed = parseMessage(formData);
		if (parsed === null) {
			throw new Error('could not parse your message');
		}

		let reply = await currencyRequest(parsed.currency, parsed.display);

		return slackResponse(`Current price (${reply.currency}): 💵 $USD${reply.USD}`, [
			`1h Δ: ${reply.percent_change_1h} · 24h Δ: ${reply.percent_change_24h} · 7d Δ: ${reply.percent_change_7d}`,
			`Updated: ${reply.updated} | ${reply.cached}`,
		]);
	} catch (e) {
		return simpleResponse(200, `Sorry, I had an issue retrieving anything for that currency: ${e}`);
	}
}