function showMask(oldStr, maskList, user, illust, page) {
	//ES6原生模式，将来再启用
	/*const cm = function(maskName) //customMask
	{
		const cusMask = maskList.find(mask=>mask.name == maskName);
		if (cusMask) { //如果有对应的自定义掩码
			if (returnLogicValue(cusMask.logic, user, illust, page)) //mask的逻辑判断
				return eval("`" + cusMask.content +"`"); //递归
			else
				return "";
		}
	}
	let newStr = eval("`" + oldStr +"`"); //需要解决旧有路径里\右斜杠的问题*/

	//以下均为传统掩码
	var newStr = oldStr;
	//var pattern = "%{([^}]+)}"; //旧的，简单匹配
	var regPattern = "%{(.*?(?:[^\\\\](?:\\\\{2})+|[^\\\\]))}"; //新的，支持转义符
	var regResult = null;

	/* jshint ignore:start */

	//不断循环直到没有掩码
	while ((regResult = new RegExp(regPattern).exec(newStr)) != null) {
		var mskO = regResult[0], //包含括号的原始掩码
			mskN = regResult[1]; //去掉掩码括号
		if (mskN != undefined) {
			//去掉转义符的掩码名
			mskN = (mskN != undefined) ? mskN.replace(/\\{/ig, "{").replace(/\\}/ig, "}").replace(/\\\\/ig, "\\") : null;
			//搜寻自定义掩码
			var cusMask = maskList.find(mask=>mask.name == mskN);
			if (cusMask) { //如果有对应的自定义掩码
				try {
					if (returnLogicValue(cusMask.logic, user, illust, page)) //mask的逻辑判断
						newStr = newStr.replace(mskO, cusMask.content);
					else
						newStr = newStr.replace(mskO, "");
				} catch (e) {
					console.error(mskO + " 自定义掩码出现了异常情况", e);
				}
			} else { //普通掩码
				try {
					var evTemp = eval(mskN);
					if (evTemp != undefined)
						newStr = newStr.replace(mskO, evTemp.toString());
					else
						newStr = newStr.replace(mskO, "");
				} catch (e) {
					newStr = newStr.replace(mskO, "");
					console.error(mskO + " 掩码出现了异常情况", e);
				}
			}
		}
	}
	
	/* jshint ignore:end */

	return newStr;
}