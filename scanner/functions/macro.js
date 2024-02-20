async function macro(t, input, expected, { options = {}, transformer = (res) => res.split('\n')[0] } = {}) {
		const formattedCode = await module.exports.prettify(input, { parser, ...options });

		t.is(transformer(formattedCode), expected);
	}