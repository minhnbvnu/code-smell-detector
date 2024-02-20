async function currencyRequest(currency, display) {
	let endpoint = 'https://api.coinmarketcap.com/v1/ticker/';

	if (display === '') {
		display = 'USD';
	}

	try {
		let resp = await fetch(
			`${endpoint}${currency}/?convert=${display}`,
			{ cf: { cacheTtl: 60 } } // Cache our responses for 60s.
		);

		let data = await resp.json();
		if (resp.status !== 200) {
			throw new Error(`bad status code from CoinMarketCap: HTTP ${resp.status}`);
		}

		let cachedResponse = false;
		if (resp.headers.get('cf-cache-status').toLowerCase() === 'hit') {
			cachedResponse = true;
		}

		let reply = {
			currency: data[0].name,
			symbol: data[0].symbol,
			USD: data[0].price_usd,
			percent_change_1h: `${data[0].percent_change_1h}%`,
			percent_change_24h: `${data[0].percent_change_24h}%`,
			percent_change_7d: `${data[0].percent_change_7d}%`,
			updated: new Date(parseInt(`${data[0].last_updated}000`)).toUTCString(),
			cached: cachedResponse,
		};

		return reply;
	} catch (e) {
		throw new Error(`could not fetch the selected currency: ${e}`);
	}
}