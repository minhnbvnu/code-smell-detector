function NewDownSchemeArrayFromJson(jsonarr) {
	if (typeof(jsonarr) == "string") {
		try {
			jsonarr = JSON.parse(jsonarr);
		} catch (e) {
			console.error("PUBD：拷贝新下载方案数组时失败(是字符串，但不是JSON)", e);
			return false;
		}
	}
	let sarr = [];
	if (Array.isArray(jsonarr)) {
		sarr = jsonarr.map(json=>{
			let scheme = new DownScheme();
			scheme.loadFromJson(json);
			return scheme;
		});
	}
	return sarr;
}