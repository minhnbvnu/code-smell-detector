function pathSafe(str = "", type = "path", newChar = "") { //去除Windows下无法作为文件名的字符，目前为了支持Linux暂不替换两种斜杠吧。
	let nstr = str.toString(); //新字符
	nstr = nstr.replace(/\u0000-\u001F\u007F-\u00A0/ig, ""); //一定去除所有的控制字符，已包含\r \n
	switch(type) {
		case "path": { //只替换路径中不能出现的字符，包括除了第一个盘符以外的其他任何
			nstr = nstr.replace(/["<>\|\*\?]|(?<!^\w):/ig, newChar);
			break;
		}
		case "pathWithoutDriver": { //只替换路径中不能出现的字符，包括除了第一个盘符以外的其他任何
			nstr = nstr.replace(/["<>\|\*\?:]/ig, newChar);
			break;
		}
		case "fn": case "filename": { //替换所有Windows名内不能出现的字符
			nstr = nstr.replace(/["<>\|:\*\?\\/]/ig, newChar); //只替换路径中完全不能出现的特殊字符
			break;
		}
	}
	return nstr;
}