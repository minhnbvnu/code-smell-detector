function returnLogicValue(logic, user, illust, page) {
	try {
		if (logic.length == 0) return false;
		/* jshint ignore:start */
		const evTemp = Boolean(eval(logic));
		/* jshint ignore:end */
		return evTemp;
	} catch (e) {
		console.error("逻辑运算出现了异常情况，逻辑内容：","(" + logic + ")", e);
		return false;
	}
}