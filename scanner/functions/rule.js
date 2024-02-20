function rule(primaryOption, options = {}, context = {}) {
	return function ruleBody(root, result) {
		let validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			{
				actual: primaryOption,
				possible: validatePrimaryOption,
			},
			{
				actual: options,
				possible: {
					unspecified: ['top', 'bottom', 'ignore', 'bottomAlphabetical'],
					emptyLineBeforeUnspecified: ['always', 'never', 'threshold'],
					emptyLineMinimumPropertyThreshold: isNumber,
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		let isFixEnabled = context.fix;
		let expectedOrder = createOrderInfo(primaryOption);

		let processedParents = [];

		// Check all rules and at-rules recursively
		root.walk(function processRulesAndAtrules(input) {
			let node = getContainingNode(input);

			// Avoid warnings duplication, caused by interfering in `root.walk()` algorigthm with `getContainingNode()`
			if (processedParents.includes(node)) {
				return;
			}

			processedParents.push(node);

			if (isRuleWithNodes(node)) {
				checkNodeForOrder({
					node,
					isFixEnabled,
					primaryOption,
					unspecified: options.unspecified || 'ignore',
					result,
					expectedOrder,
				});

				checkNodeForEmptyLines({
					node,
					context,
					emptyLineBeforeUnspecified: options.emptyLineBeforeUnspecified,
					emptyLineMinimumPropertyThreshold:
						options.emptyLineMinimumPropertyThreshold || 0,
					expectedOrder,
					isFixEnabled,
					primaryOption,
					result,
				});
			}
		});
	};
}