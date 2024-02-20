async function toHaveNoViolations(page, { config = {} } = {}) {
	const axe = new AxePuppeteer(page);
	axe.include('#root').configure(config);
	const { violations } = await axe.analyze();
	const pass = violations.length === 0;
	const message = pass
		? () => {}
		: () =>
				`${this.utils.matcherHint('.toHaveNoViolations')}\n\n` +
				`Expected story to pass aXe accessibility tests.\n` +
				`The following violations were found:\n` +
				`${outputViolations(violations)}`;

	return {
		message,
		pass,
	};
}