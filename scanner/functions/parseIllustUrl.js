function parseIllustUrl(url) {
	let src
	try {
		src = new URL(url);
	} catch (error) {
		return null;
	}
	const obj = {
		domain: src.host, //为了兼容老的
		parsedURL: { //目前用到的不多，只保留这两个值
			host: src.host, //域（即主机名）后跟端口
			protocol: src.protocol, //URL 协议名
		}
	};
	const parsedURL = obj.parsedURL;
	let regRes = new RegExp(illustPathRegExp.source, illustPathRegExp.flags).exec(src.pathname);
	if (regRes)
	{
		//为了兼容老的
		obj.url_without_page = `${src.origin}${regRes[1]}`;
		obj.filename = regRes[2];
		//id直接在原始数据有
		obj.token = regRes[4];
		obj.extention = regRes[5];

		parsedURL.path_before_page = regRes[1];
		parsedURL.filename = regRes[2];
		parsedURL.id = regRes[3];
		parsedURL.token = regRes[4];
		parsedURL.extention = regRes[5];
	}else if (regRes = new RegExp(limitingPathRegExp.source, limitingPathRegExp.flags).exec(src.pathname)) //上锁图片
	{
		//为了兼容老的
		obj.url_without_page = `${src.origin}${regRes[1]}`;
		obj.filename = regRes[2];
		//id直接在原始数据有
		obj.extention = regRes[3];

		parsedURL.path_before_page = regRes[1];
		parsedURL.limited = true;
		parsedURL.filename = regRes[2];
		parsedURL.extention = regRes[3];
	}else
	{
		parsedURL.unknown = true;
	}
	return obj;
}